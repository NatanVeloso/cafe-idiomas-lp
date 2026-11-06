import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

interface SceneProps {
  /** Render loop runs only while the hero is on screen. */
  active: boolean;
  /** prefers-reduced-motion: keep the cup still (no float, no idle spin). */
  reduced: boolean;
}

const CUP_COLOR = '#ee6b52';
const COFFEE_COLOR = '#2a1710';

/** Cup profile (radius, height): up the outside, over the rim, down the inside to the coffee. */
const CUP_PROFILE: [number, number][] = [
  [0, 0],
  [0.5, 0],
  [0.57, 0.02],
  [0.62, 0.08],
  [0.72, 0.6],
  [0.78, 1.02],
  [0.79, 1.08],
  [0.74, 1.08],
  [0.72, 1.04],
  [0.7, 0.98],
  [0.66, 0.86],
  [0, 0.86],
];

/** Saucer profile: along the underside to the rim, then back inward across the top (so the top faces up). */
const SAUCER_PROFILE: [number, number][] = [
  [0, -0.1],
  [0.5, -0.1],
  [0.6, -0.07],
  [1.0, -0.01],
  [1.33, 0.13],
  [1.4, 0.19],
  [1.38, 0.23],
  [1.31, 0.2],
  [1.02, 0.07],
  [0.7, 0.02],
  [0.6, -0.01],
  [0, -0.01],
];

const SAUCER_COLOR = '#F4ECE1';

/** Handle torus: centre offset from the cup axis, ring radius and tube radius. */
const HANDLE_X = 0.98;
const HANDLE_Y = 0.54;
const HANDLE_RADIUS = 0.3;
const HANDLE_TUBE = 0.085;

// Camera sits on the x = 0 plane, looking down at the cup. The canvas extends well above
// the cup so the steam has room to rise and fade.
const CAMERA_POSITION: [number, number, number] = [0, 2.3, 5.0];
const CAMERA_TARGET: [number, number, number] = [0, 0.55, 0];
const CAMERA_FOV = 45;

/** Resting height of the cup group (the saucer sits here). */
const CUP_BASE_Y = -0.58;
/** When the canvas is narrow the cup shrinks toward this height (≈ its visual centre), so it stays centred. */
const FIT_PIVOT_Y = -0.2;
/** Largest share of the canvas width the cup + saucer may take; the rest is breathing room. */
const FIT_FILL = 0.9;

/**
 * Widest horizontal reach of the cup + saucer on screen at scale 1, as tan(angle) off the view axis.
 * Sampled around full circles (saucer rim, outer edge of the handle) so it holds for any yaw the
 * idle spin and pointer parallax give the group.
 */
const SCENE_HALF_TAN = (() => {
  const eye = new THREE.Vector3(...CAMERA_POSITION);
  const forward = new THREE.Vector3(...CAMERA_TARGET).sub(eye).normalize();
  const saucer = SAUCER_PROFILE.reduce((best, p) => (p[0] > best[0] ? p : best));
  const rings: [radius: number, y: number][] = [
    [saucer[0], saucer[1]],
    [HANDLE_X + HANDLE_RADIUS + HANDLE_TUBE, HANDLE_Y],
  ];
  const p = new THREE.Vector3();
  let max = 0;
  for (const [radius, y] of rings) {
    for (let i = 0; i < 96; i++) {
      const a = (i / 96) * Math.PI * 2;
      p.set(Math.cos(a) * radius, CUP_BASE_Y + y, Math.sin(a) * radius).sub(eye);
      max = Math.max(max, Math.abs(p.x) / p.dot(forward));
    }
  }
  return max;
})();

/**
 * Scale (≤ 1) that keeps the whole cup + saucer inside the canvas width. The canvas is much taller
 * than wide, so the horizontal field of view is what limits it; on wide canvases this stays at 1.
 */
function useFitScale() {
  const { width, height } = useThree((s) => s.size);
  return useMemo(() => {
    if (!width || !height) return 1;
    const halfTan = (width / height) * Math.tan(THREE.MathUtils.degToRad(CAMERA_FOV / 2));
    return Math.min(1, (FIT_FILL * halfTan) / SCENE_HALF_TAN);
  }, [width, height]);
}

function useLathePoints(profile: [number, number][]) {
  return useMemo(() => profile.map(([x, y]) => new THREE.Vector2(x, y)), [profile]);
}

/** Soft round puff used by the steam sprites. */
function useSteamTexture() {
  return useMemo(() => {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(255,255,255,0.9)');
    g.addColorStop(0.4, 'rgba(255,255,255,0.35)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

const STEAM_COUNT = 16;
const STEAM_LIFE = 4.4;
const STEAM_RISE = 2.1;

function Steam({ reduced }: { reduced: boolean }) {
  const texture = useSteamTexture();
  const sprites = useRef<(THREE.Sprite | null)[]>([]);
  const seeds = useMemo(
    () =>
      Array.from({ length: STEAM_COUNT }, (_, i) => ({
        phase: (i / STEAM_COUNT) * STEAM_LIFE,
        x: (Math.random() - 0.5) * 0.5,
        wobble: 0.6 + Math.random() * 0.8,
        speed: 0.85 + Math.random() * 0.3,
      })),
    []
  );

  useFrame(({ clock }) => {
    const t = reduced ? 1.2 : clock.getElapsedTime();
    seeds.forEach((s, i) => {
      const sprite = sprites.current[i];
      if (!sprite) return;
      const p = ((t * s.speed + s.phase) % STEAM_LIFE) / STEAM_LIFE; // 0..1 life
      const y = 0.95 + p * STEAM_RISE;
      const x = s.x + Math.sin(p * 4 + s.phase * 2) * 0.22 * s.wobble * p;
      sprite.position.set(x, y, Math.sin(p * 3 + s.phase) * 0.12);
      const scale = 0.22 + p * 1.1;
      sprite.scale.set(scale, scale, 1);
      // Fade in fast, then dissolve slowly as the puff spreads out.
      (sprite.material as THREE.SpriteMaterial).opacity = Math.min(1, p * 5) * Math.pow(1 - p, 1.4) * 0.5;
    });
  });

  return (
    <group>
      {seeds.map((_, i) => (
        <sprite
          key={i}
          ref={(el) => {
            sprites.current[i] = el;
          }}
        >
          <spriteMaterial map={texture} transparent depthWrite={false} opacity={0} />
        </sprite>
      ))}
    </group>
  );
}

function Cup({ reduced }: { reduced: boolean }) {
  const points = useLathePoints(CUP_PROFILE);
  const saucerPoints = useLathePoints(SAUCER_PROFILE);
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const start = useRef<number | null>(null);
  const fit = useFitScale();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(({ clock }, delta) => {
    const g = group.current;
    if (!g) return;
    const t = clock.getElapsedTime();
    if (start.current === null) start.current = t;
    const elapsed = t - start.current;

    // Entrance: ease-out scale
    const e = Math.min(1, elapsed / 1.1);
    const eased = 1 - Math.pow(1 - e, 3);
    g.scale.setScalar((0.72 + 0.28 * eased) * fit);

    const idleYaw = reduced ? 0 : Math.sin(t * 0.35) * 0.18;
    const floatY = reduced ? 0 : Math.sin(t * 1.1) * 0.045;
    const targetY = 0.42 + idleYaw + pointer.current.x * 0.35;
    const targetX = pointer.current.y * 0.12;
    const k = 1 - Math.exp(-delta * 4);
    g.rotation.y += (targetY - g.rotation.y) * k;
    g.rotation.x += (targetX - g.rotation.x) * k;
    // Shrinking about the pivot (not the saucer base) keeps the cup centred in its column.
    g.position.y = FIT_PIVOT_Y + (CUP_BASE_Y + floatY - FIT_PIVOT_Y) * fit;
  });

  return (
    <group ref={group} position={[0, CUP_BASE_Y, 0]} rotation={[0, 0.42, 0]}>
      {/* Body */}
      <mesh>
        <latheGeometry args={[points, 72]} />
        <meshPhysicalMaterial
          color={CUP_COLOR}
          roughness={0.32}
          metalness={0}
          clearcoat={0.55}
          clearcoatRoughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Coffee surface */}
      <mesh position={[0, 0.87, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.665, 64]} />
        <meshStandardMaterial color={COFFEE_COLOR} roughness={0.14} metalness={0.08} />
      </mesh>
      {/* Handle */}
      <mesh position={[HANDLE_X, HANDLE_Y, 0]}>
        <torusGeometry args={[HANDLE_RADIUS, HANDLE_TUBE, 24, 64]} />
        <meshPhysicalMaterial color={CUP_COLOR} roughness={0.32} clearcoat={0.55} clearcoatRoughness={0.3} />
      </mesh>
      {/* Saucer */}
      <mesh position={[0, -0.005, 0]}>
        <latheGeometry args={[saucerPoints, 96]} />
        <meshPhysicalMaterial
          color={SAUCER_COLOR}
          roughness={0.38}
          metalness={0}
          clearcoat={0.4}
          clearcoatRoughness={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>
      <Steam reduced={reduced} />
    </group>
  );
}

export default function CoffeeScene({ active, reduced }: SceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: CAMERA_POSITION, fov: CAMERA_FOV, near: 0.1, far: 50 }}
      onCreated={({ camera }) => camera.lookAt(...CAMERA_TARGET)}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={2.0} />
      <directionalLight position={[-4, 2, -3]} intensity={1.0} color="#8ec5ff" />
      <pointLight position={[0, 3, -3]} intensity={6} color="#ffd9b0" />
      <Cup reduced={reduced} />
    </Canvas>
  );
}
