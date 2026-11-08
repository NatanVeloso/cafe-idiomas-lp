import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

/**
 * Official logo mug (white porcelain bowl, coral "speech bubble" top with its tail running down
 * the body, handle on the right, two steam ribbons). Ported 1:1 from the approved reference
 * (caneca.html): same lathe/handle geometry, same hand-written porcelain shader, same orthographic
 * 17° view, same idle sway / bob / steam motion. Units: the rim radius is 1.
 */

interface SceneProps {
  /** Render loop runs only while the hero is on screen. */
  active: boolean;
  /** prefers-reduced-motion: freeze the idle motion (pointer still turns the mug). */
  reduced: boolean;
}

const TAU = Math.PI * 2;
/** Camera tilt (looking down at the mug), as in the reference. */
const TILT = 0.301;
/** Yaw limit for the idle sway and the pointer: ±14°. */
const YAW_LIMIT = (14 * Math.PI) / 180;
/**
 * HeroVisual's canvas wrapper extends `-top-56` (14rem) above the visual box so the steam can rise
 * over it. The mug is framed inside the box below that bleed.
 */
const TOP_BLEED_PX = 224;
/** Screen-space y (world units, up) of the visual centre of mug + shadow. */
const MUG_CENTER_Y = -0.63;
/** Horizontal centre of mug + handle (the handle reaches x ≈ 1.33, the bowl x = -1). */
const MUG_CENTER_X = 0.15;

// ---------------------------------------------------------------------------------------------
// Geometry (identical to the reference's WebGL layer)
// ---------------------------------------------------------------------------------------------

/** material: 0 = bowl (white + coral tail), 1 = handle (white), 2 = coral top. */
function buildPorcelainGeometry() {
  const vertices: number[] = [];
  const indices: number[] = [];

  const grid = (rows: number, cols: number, sample: (i: number, j: number) => number[]) => {
    const start = vertices.length / 7;
    for (let i = 0; i <= rows; i++) for (let j = 0; j <= cols; j++) vertices.push(...sample(i, j));
    for (let i = 0; i < rows; i++)
      for (let j = 0; j < cols; j++) {
        const a = start + i * (cols + 1) + j;
        const b = a + cols + 1;
        indices.push(a, b, a + 1, a + 1, b, b + 1);
      }
  };

  const lathe = (profile: [number, number][], material: number) => {
    grid(profile.length - 1, 144, (i, j) => {
      const a = (j / 144) * TAU;
      const [r, y] = profile[i];
      const before = profile[Math.max(0, i - 1)];
      const after = profile[Math.min(profile.length - 1, i + 1)];
      const dr = after[0] - before[0];
      const dy = after[1] - before[1];
      const len = Math.hypot(dr, dy);
      return [r * Math.sin(a), y, r * Math.cos(a), (dy * Math.sin(a)) / len, -dr / len, (dy * Math.cos(a)) / len, material];
    });
  };

  // Bowl: half-ellipsoid (rim radius 1, depth 1.34) plus a small rolled lip.
  const cup: [number, number][] = [];
  for (let i = 0; i <= 80; i++) {
    const a = ((i / 80) * Math.PI) / 2;
    cup.push([Math.sin(a), -1.34 * Math.cos(a)]);
  }
  cup.push([0.999, 0.011], [0.995, 0.02], [0.986, 0.026], [0.974, 0.026], [0.963, 0.022], [0.955, 0.013], [0.95, 0], [0.945, -0.033]);
  lathe(cup, 0);

  // Coral top (the speech bubble), just below the lip.
  lathe([[0.946, -0.023], [0.939, -0.027], [0.92, -0.04], [0.88, -0.044], [0.58, -0.045], [0, -0.045]], 2);

  // Swept ceramic tube for the handle; both ends sink into the bowl wall.
  grid(76, 28, (i, j) => {
    const t = i / 76;
    const a = t * Math.PI;
    const b = (j / 28) * TAU;
    const x = 0.927 + 0.411 * Math.sin(a) - 0.13 * t;
    const y = -0.115 - 0.6 * t + 0.08 * Math.sin(2 * a);
    const dx = 0.411 * Math.PI * Math.cos(a) - 0.13;
    const dy = -0.6 + 0.16 * Math.PI * Math.cos(2 * a);
    const len = Math.hypot(dx, dy);
    const nx = (-dy / len) * Math.cos(b);
    const ny = (dx / len) * Math.cos(b);
    const thickness = 0.057 + 0.015 * Math.pow(Math.abs(2 * t - 1), 3);
    return [x + thickness * nx, y + thickness * ny, thickness * Math.sin(b), nx, ny, Math.sin(b), 1];
  });

  const data = new Float32Array(vertices);
  const buffer = new THREE.InterleavedBuffer(data, 7);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.InterleavedBufferAttribute(buffer, 3, 0));
  geometry.setAttribute('normal', new THREE.InterleavedBufferAttribute(buffer, 3, 3));
  geometry.setAttribute('aMat', new THREE.InterleavedBufferAttribute(buffer, 1, 6));
  geometry.setIndex(indices);
  geometry.computeBoundingSphere();
  return geometry;
}

// The reference's porcelain shader. Lighting is computed in the yawed (pre-tilt) frame, exactly as
// there; the mesh itself sits inside the tilted group, so gl_Position goes through three's matrices.
// No colorspace / tonemapping chunks: the colours are written as-is, like the reference's raw WebGL.
const PORCELAIN_VERTEX = /* glsl */ `
  attribute float aMat;
  uniform float angle;
  varying vec3 n, local, world;
  varying float mat;
  void main(){
    float c=cos(angle),s=sin(angle);
    mat3 turn=mat3(c,0.,-s, 0.,1.,0., s,0.,c);
    world=turn*position; local=position; n=turn*normal; mat=aMat;
    gl_Position=projectionMatrix*modelViewMatrix*vec4(world,1.);
  }`;

const PORCELAIN_FRAGMENT = /* glsl */ `
  varying vec3 n,local,world;
  varying float mat;
  float card(vec3 r,vec3 center,float width,float height){
    vec3 u=normalize(cross(vec3(0.,1.,0.),center));
    vec3 v=cross(center,u);
    float a=dot(r,center);
    vec2 uv=abs(vec2(dot(r,u),dot(r,v)))/max(.01,a);
    return (1.-smoothstep(width*.68,width,uv.x))*(1.-smoothstep(height*.72,height,uv.y))*step(.01,a);
  }
  void main(){
    vec3 N=normalize(n), V=vec3(0.,.29647,.95504), L=normalize(vec3(-.65,.95,.8));
    vec3 R=reflect(-V,N);
    float front=atan(local.x,local.z);
    float t=clamp(-local.y/.78,0.,1.);
    float tail=smoothstep(-.009,.009,front-(-.69-.24*t))*
        (1.-smoothstep(-.009,.009,front+.93*t))*(1.-smoothstep(.775,.785,-local.y));
    float coral=mat>1.5 && mat<2.5 ? 1. : (mat<.5 ? tail : 0.);
    vec3 base=mix(vec3(.97,.965,.93),vec3(.96,.337,.226),coral);
    float diffuse=max(dot(N,L),0.);
    vec3 shade=mix(vec3(.48,.58,.64),vec3(.94,.98,1.),N.y*.5+.5);
    vec3 color=base*(.73*shade+.37*diffuse+.06);
    if(mat>1.5 && mat<2.5){
      float radius=length(local.xz);
      color*=1.-.21*smoothstep(.80,.97,radius);
      color+=vec3(.07,.016,.005)*(1.-radius);
    }
    float softbox=card(R,normalize(vec3(-.75,.55,.70)),.28,.65);
    float strip=card(R,normalize(vec3(.72,.38,-.32)),.14,.91);
    float shine=.11+.40*pow(1.-max(0.,dot(N,V)),3.);
    color+=vec3(1.,.97,.90)*softbox*(shine+.07*coral);
    color+=vec3(.78,.92,1.)*strip*shine;
    color+=vec3(.18)*pow(max(dot(R,normalize(vec3(-.4,.85,-.30))),0.),65.);
    gl_FragColor=vec4(color,1.);
  }`;

// Steam ribbon: the reference's vertical canvas gradient, sampled along the ribbon's length.
const STEAM_VERTEX = /* glsl */ `
  attribute float aT;
  varying float vT;
  void main(){ vT=aT; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`;

const STEAM_FRAGMENT = /* glsl */ `
  varying float vT;
  void main(){
    vec4 c0=vec4(255.,236.,218.,.66*255.)/255.;
    vec4 c1=vec4(255.,254.,247.,.97*255.)/255.;
    vec4 c2=vec4(245.,252.,255.,.91*255.)/255.;
    vec4 c3=vec4(241.,250.,255.,.50*255.)/255.;
    vec4 c = vT<.28 ? mix(c0,c1,vT/.28) : (vT<.72 ? mix(c1,c2,(vT-.28)/.44) : mix(c2,c3,(vT-.72)/.28));
    gl_FragColor=c;
  }`;

// Soft contact shadow: radial gradient on a unit quad, stretched into a flat ellipse.
const SHADOW_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main(){ vUv=position.xy; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`;

const SHADOW_FRAGMENT = /* glsl */ `
  varying vec2 vUv;
  void main(){
    float d=length(vUv);
    float a = d<.57 ? mix(.38,.19,d/.57) : mix(.19,0.,clamp((d-.57)/.43,0.,1.));
    gl_FragColor=vec4(1./255.,14./255.,21./255.,a);
  }`;

const STEAM_SEGMENTS = 60;

interface Ribbon {
  x: number;
  y: number;
  height: number;
  width: number;
  phase: number;
}

const RIBBONS: Ribbon[] = [
  { x: -0.13, y: -0.035, height: 1.04, width: 0.06, phase: -0.72 },
  { x: 0.17, y: 0.48, height: 0.88, width: 0.051, phase: 2.65 },
];

function buildRibbonGeometry() {
  const count = (STEAM_SEGMENTS + 1) * 2;
  const geometry = new THREE.BufferGeometry();
  const position = new THREE.BufferAttribute(new Float32Array(count * 3), 3);
  position.setUsage(THREE.DynamicDrawUsage);
  const t = new Float32Array(count);
  const index: number[] = [];
  for (let i = 0; i <= STEAM_SEGMENTS; i++) {
    t[i * 2] = t[i * 2 + 1] = i / STEAM_SEGMENTS;
    if (i < STEAM_SEGMENTS) {
      const a = i * 2;
      index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }
  geometry.setAttribute('position', position);
  geometry.setAttribute('aT', new THREE.BufferAttribute(t, 1));
  geometry.setIndex(index);
  // Positions change every frame; skip culling instead of recomputing bounds.
  return geometry;
}

/** Writes the reference's steam ribbon shape for `time` into the geometry (local, pre-yaw space). */
function updateRibbon(geometry: THREE.BufferGeometry, r: Ribbon, time: number) {
  const pos = geometry.getAttribute('position') as THREE.BufferAttribute;
  const arr = pos.array as Float32Array;
  const bend = 0.48 * Math.sin(time * 1.42 + r.phase);
  for (let i = 0; i <= STEAM_SEGMENTS; i++) {
    const t = i / STEAM_SEGMENTS;
    const wave = 0.08 * Math.sin(TAU * t + r.phase + bend);
    const drift = 0.043 * t * Math.sin(time * 1.72 - 3.3 * t + r.phase);
    const mid = r.x + wave + drift;
    const half = r.width * Math.pow(Math.sin(Math.PI * t), 0.8);
    const rise = r.y + t * r.height + 0.026 * t * t * Math.sin(time * 1.34 + r.phase);
    const o = i * 6;
    arr[o] = mid - half;
    arr[o + 1] = rise;
    arr[o + 2] = 0.025;
    arr[o + 3] = mid + half;
    arr[o + 4] = rise;
    arr[o + 5] = 0.025;
  }
  pos.needsUpdate = true;
}

/** Orthographic framing: fit the mug in the visual box (below the steam bleed), like the reference's scale. */
function Framing() {
  const camera = useThree((s) => s.camera);
  const { width, height } = useThree((s) => s.size);

  useLayoutEffect(() => {
    if (!width || !height || !(camera instanceof THREE.OrthographicCamera)) return;
    const bleed = Math.min(TOP_BLEED_PX, height * 0.35);
    const box = height - bleed;
    const scale = Math.min(width / 3.0, box / 1.95, 232);
    camera.zoom = scale;
    // Put the mug's visual centre at the centre of the box (bleed/2 px below the canvas centre).
    camera.position.set(MUG_CENTER_X, MUG_CENTER_Y + bleed / 2 / scale, 10);
    camera.lookAt(camera.position.x, camera.position.y, 0);
    camera.updateProjectionMatrix();
  }, [camera, width, height]);

  return null;
}

function Mug({ reduced }: { reduced: boolean }) {
  const porcelain = useMemo(buildPorcelainGeometry, []);
  const porcelainMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { angle: { value: 0 } },
        vertexShader: PORCELAIN_VERTEX,
        fragmentShader: PORCELAIN_FRAGMENT,
        side: THREE.DoubleSide,
      }),
    []
  );
  const ribbons = useMemo(() => RIBBONS.map(buildRibbonGeometry), []);
  const steamMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: STEAM_VERTEX,
        fragmentShader: STEAM_FRAGMENT,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    []
  );
  const shadowMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: SHADOW_VERTEX,
        fragmentShader: SHADOW_FRAGMENT,
        transparent: true,
        depthWrite: false,
      }),
    []
  );

  useEffect(
    () => () => {
      porcelain.dispose();
      porcelainMaterial.dispose();
      ribbons.forEach((g) => g.dispose());
      steamMaterial.dispose();
      shadowMaterial.dispose();
    },
    [porcelain, porcelainMaterial, ribbons, steamMaterial, shadowMaterial]
  );

  const root = useRef<THREE.Group>(null);
  const steamYaw = useRef<THREE.Group>(null);
  const time = useRef(0);
  const entrance = useRef(reduced ? 1 : 0);
  const rotation = useRef(0);
  const pointerX = useRef(0);

  useEffect(() => {
    // The canvas is pointer-events-none (it sits under the hero chips), so the reference's drag
    // becomes a gentle follow of the mouse across the window, within the same ±14°.
    const onMove = (e: MouseEvent) => {
      pointerX.current = (e.clientX / window.innerWidth - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Steam shape at t = 0 so a reduced-motion (frozen) frame still shows it.
  useLayoutEffect(() => {
    ribbons.forEach((g, i) => updateRibbon(g, RIBBONS[i], 0));
  }, [ribbons]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.08);
    if (!reduced) time.current += dt;
    const t = time.current;

    const clamp = (a: number) => Math.max(-YAW_LIMIT, Math.min(YAW_LIMIT, a));
    const target = clamp(pointerX.current * YAW_LIMIT * 0.8);
    rotation.current += (target - rotation.current) * (1 - Math.exp(-dt * 3));
    const r = rotation.current;
    const yaw = clamp(r + (1 - Math.abs(r) / YAW_LIMIT) * 0.055 * Math.sin(t * 0.58));
    porcelainMaterial.uniforms.angle.value = yaw;
    if (steamYaw.current) steamYaw.current.rotation.y = yaw;

    if (!reduced) ribbons.forEach((g, i) => updateRibbon(g, RIBBONS[i], t));

    const g = root.current;
    if (g) {
      g.position.y = -Math.sin(t * 0.9) * 0.019;
      entrance.current = Math.min(1, entrance.current + dt / 0.9);
      const e = 1 - Math.pow(1 - entrance.current, 3);
      g.scale.setScalar(0.94 + 0.06 * e);
    }
  });

  return (
    <group ref={root}>
      {/* Contact shadow, in screen plane (not tilted), drawn first. */}
      <mesh position={[0.03, -1.47, -5]} scale={[0.72, 0.082, 1]} renderOrder={0} material={shadowMaterial}>
        <planeGeometry args={[2, 2]} />
      </mesh>
      <group rotation={[TILT, 0, 0]}>
        <mesh geometry={porcelain} material={porcelainMaterial} renderOrder={1} frustumCulled={false} />
        <group ref={steamYaw}>
          {ribbons.map((geometry, i) => (
            <mesh key={i} geometry={geometry} material={steamMaterial} renderOrder={2} frustumCulled={false} />
          ))}
        </group>
      </group>
    </group>
  );
}

export default function CoffeeScene({ active, reduced }: SceneProps) {
  return (
    <Canvas
      orthographic
      dpr={[1, 1.75]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [MUG_CENTER_X, 0, 10], zoom: 100, near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      style={{ background: 'transparent' }}
    >
      <Framing />
      <Mug reduced={reduced} />
    </Canvas>
  );
}
