import { useRef, type PointerEvent } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { ArrowUpRight, CalendarCheck, ClipboardList, FileBadge, Medal } from 'lucide-react';
import { fadeUp, revealItem, slideInLeft, stagger, VIEWPORT } from '../motion/presets';
import { PAGE_LANGUAGE, VARIANT, type Variant } from '../variant';
import enDesktop from '../assets/portal/en-desktop.webp';
import frDesktop from '../assets/portal/fr-desktop.webp';
import enMobile from '../assets/portal/en-mobile.webp';
import frMobile from '../assets/portal/fr-mobile.webp';

/**
 * Vitrine do Portal do Aluno: notebook + celular montados em CSS 3D (sem modelo externo),
 * com prints reais do portal tirados de um ambiente local com dados fictícios.
 * Na home o notebook mostra inglês e o celular francês (a home fala dos dois idiomas).
 */

const PORTAL_URL = 'https://portal.escolacafeidiomas.com.br';

const SHOTS: Record<Variant, { laptop: string; laptopAlt: string; phone: string; phoneAlt: string }> = {
  geral: {
    laptop: enDesktop,
    laptopAlt: 'Mural de conquistas do Portal do Aluno no notebook, com a jornada de níveis do inglês',
    phone: frMobile,
    phoneAlt: 'Tela inicial do Portal do Aluno no celular, com conquistas e progresso no francês',
  },
  ingles: {
    laptop: enDesktop,
    laptopAlt: 'Mural de conquistas do Portal do Aluno no notebook, com a jornada de níveis do inglês',
    phone: enMobile,
    phoneAlt: 'Tela inicial do Portal do Aluno no celular, com conquistas e progresso no inglês',
  },
  frances: {
    laptop: frDesktop,
    laptopAlt: 'Mural de conquistas do Portal do Aluno no notebook, com a jornada de níveis do francês',
    phone: frMobile,
    phoneAlt: 'Tela inicial do Portal do Aluno no celular, com conquistas e progresso no francês',
  },
};

const evolution =
  PAGE_LANGUAGE === 'ingles' ? 'no inglês' : PAGE_LANGUAGE === 'frances' ? 'no francês' : 'no idioma';

const features = [
  {
    icon: CalendarCheck,
    title: 'Aulas e gravações',
    description: 'Veja suas próximas aulas e reveja as gravações sempre que quiser.',
  },
  {
    icon: ClipboardList,
    title: 'Exercícios do professor',
    description: 'As atividades que o seu professor libera ficam no portal, e cada entrega vale pontos.',
  },
  {
    icon: Medal,
    title: 'Conquistas e jornada',
    description: 'Desbloqueie insígnias, suba no ranking e carimbe um destino no passaporte a cada nível concluído.',
  },
  {
    icon: FileBadge,
    title: 'Relatórios e certificado',
    description: 'Acompanhe seus relatórios e notas e peça o seu certificado direto pelo portal.',
  },
];

/** Camadas empilhadas em Z que dão espessura a uma peça plana quando a cena gira. */
function Thickness({ layers, gap, className }: { layers: number; gap: number; className: string }) {
  return (
    <>
      {Array.from({ length: layers }, (_, i) => (
        <div
          key={i}
          aria-hidden="true"
          className={`absolute inset-0 ${className}`}
          style={{ transform: `translateZ(${-(i + 1) * gap}px)` }}
        />
      ))}
    </>
  );
}

function Laptop({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
      {/* Tampa */}
      <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
        <Thickness layers={5} gap={1.4} className="rounded-[2.4%/3.8%] bg-[#2b2f35]" />
        <div className="relative rounded-[2.4%/3.8%] bg-[#0e1013] p-[2.1%] pb-[2.6%] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[0.9%] h-[0.9%] w-[0.6%] -translate-x-1/2 rounded-full bg-[#2c3138]"
          />
          <div className="relative overflow-hidden rounded-[0.6%/1%] bg-black">
            <img
              src={src}
              alt={alt}
              width={1600}
              height={1000}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full select-none"
              draggable={false}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.14] via-transparent to-transparent"
            />
          </div>
        </div>
      </div>
      {/* Base (vista frontal, com o recorte para abrir a tampa) */}
      <div
        aria-hidden="true"
        className="relative -mx-[7%] aspect-[100/3.4] bg-gradient-to-b from-[#e3e6ea] via-[#c4c9cf] to-[#8d939b] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
        style={{ borderBottomLeftRadius: '6% 100%', borderBottomRightRadius: '6% 100%' }}
      >
        <span className="absolute left-1/2 top-0 h-[45%] w-[14%] -translate-x-1/2 rounded-b-[40%] bg-gradient-to-b from-[#a9aeb5] to-[#c4c9cf]" />
      </div>
    </div>
  );
}

/** Barra de status desenhada em SVG: escala junto com o aparelho, em qualquer tamanho. */
function StatusBar() {
  return (
    <svg viewBox="0 0 390 47" className="block w-full" aria-hidden="true">
      <rect width="390" height="47" fill="#fbf8f2" />
      <text x="46" y="31" fontSize="16" fontWeight="600" fill="#0e1013" fontFamily="system-ui, -apple-system, sans-serif">
        9:41
      </text>
      <rect x="135" y="10" width="120" height="33" rx="16.5" fill="#000" />
      <g fill="#0e1013">
        <rect x="290" y="24" width="3.5" height="6" rx="1" />
        <rect x="295.5" y="21" width="3.5" height="9" rx="1" />
        <rect x="301" y="18" width="3.5" height="12" rx="1" />
        <rect x="306.5" y="15" width="3.5" height="15" rx="1" />
        <path d="M321 29.5a2 2 0 1 0 0.01 0zM315.5 24a8 8 0 0 1 11 0l-1.6 1.7a5.6 5.6 0 0 0-7.8 0zM312 20.4a13 13 0 0 1 18 0l-1.6 1.7a10.6 10.6 0 0 0-14.8 0z" />
        <rect x="337" y="17" width="23" height="12" rx="3.5" fill="none" stroke="#0e1013" strokeOpacity="0.4" />
        <rect x="339" y="19" width="17" height="8" rx="2" />
        <rect x="361.5" y="21" width="1.8" height="4" rx="0.9" fillOpacity="0.4" />
      </g>
    </svg>
  );
}

function Phone({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
      <Thickness layers={7} gap={1.3} className="rounded-[17%/7.9%] bg-[#33373e]" />
      <div className="relative rounded-[17%/7.9%] bg-[#0e1013] p-[3.6%] shadow-[inset_0_0_0_1.5px_#6f757d,inset_0_0_0_3px_#1a1d21]">
        <div className="relative aspect-[390/844] overflow-hidden rounded-[13.5%/6.2%] bg-[#fbf8f2]">
          <StatusBar />
          <img
            src={src}
            alt={alt}
            width={600}
            height={1298}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full select-none"
            draggable={false}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.18] via-transparent to-transparent"
          />
        </div>
      </div>
    </div>
  );
}

function useStageMotion(target: React.RefObject<HTMLDivElement>) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ['start end', 'end start'] });
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spring = { stiffness: 110, damping: 18, mass: 0.6 };
  const px = useSpring(pointerX, spring);
  const py = useSpring(pointerY, spring);

  // A cena gira devagar enquanto a seção atravessa a tela; o mouse soma um leve "parallax".
  const rotateY: MotionValue<number> = useTransform([scrollYProgress, px], ([s, x]: number[]) =>
    reduce ? -12 : -24 + s * 22 + x * 10,
  );
  const rotateX: MotionValue<number> = useTransform([scrollYProgress, py], ([s, y]: number[]) =>
    reduce ? 6 : 13 - s * 10 - y * 8,
  );
  const phoneY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['18%', '-10%']);

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - r.left) / r.width - 0.5);
    pointerY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return { rotateX, rotateY, phoneY, onPointerMove, onPointerLeave };
}

function DeviceStage() {
  const ref = useRef<HTMLDivElement>(null);
  const shots = SHOTS[VARIANT];
  const { rotateX, rotateY, phoneY, onPointerMove, onPointerLeave } = useStageMotion(ref);

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative mx-auto w-full max-w-[820px] pb-[9%] pr-[7%]"
      style={{ perspective: '1800px' }}
    >
      {/* Sombra no "chão", fora do grupo que gira */}
      <div
        aria-hidden="true"
        className="absolute bottom-[4%] left-[8%] right-[14%] h-[10%] rounded-[50%] bg-cafe-navy/25 blur-2xl"
      />
      <motion.div className="relative" style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        <div className="mx-[6%]">
          <Laptop src={shots.laptop} alt={shots.laptopAlt} />
        </div>
        <motion.div
          className="absolute -bottom-[10%] -right-[6%] w-[25%]"
          style={{ y: phoneY, z: 110, rotateY: 8, transformStyle: 'preserve-3d' }}
        >
          <Phone src={shots.phone} alt={shots.phoneAlt} />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function PortalShowcase() {
  return (
    <section id="portal" className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[min(1100px,140vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cafe-cream blur-3xl"
      />
      <div className="container relative mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={stagger(0.1)}
          className="mx-auto mb-12 max-w-3xl text-center lg:mb-16"
        >
          <motion.h2 variants={fadeUp} className="mb-4 text-balance text-4xl font-bold text-cafe-navy lg:text-5xl">
            Seu curso continua no Portal do Aluno
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg leading-relaxed text-cafe-ink lg:text-xl">
            Entre uma aula e outra, tudo fica em um só lugar: aulas, exercícios, conquistas e a sua evolução {evolution}.
            No computador ou no celular.
          </motion.p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.55fr_1fr] lg:gap-14">
          <DeviceStage />

          <motion.div initial="hidden" whileInView="show" viewport={VIEWPORT} variants={stagger(0.1)}>
            <ul className="space-y-6">
              {features.map((feature, index) => (
                <motion.li
                  key={feature.title}
                  variants={slideInLeft}
                  {...revealItem(index * 0.1)}
                  className="flex items-start gap-4"
                >
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-cafe-navy">
                    <feature.icon className="h-5 w-5 text-white" />
                  </span>
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-cafe-navy">{feature.title}</h3>
                    <p className="leading-relaxed text-cafe-ink">{feature.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <motion.div variants={fadeUp} className="mt-8 border-t border-cafe-sand pt-6">
              <a
                href={PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-semibold text-cafe-navy transition-colors hover:text-cafe-coral-dark"
              >
                Já é aluno? Acesse o portal
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <p className="mt-2 text-sm text-cafe-ink/80">Telas reais do portal, com dados de demonstração.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
