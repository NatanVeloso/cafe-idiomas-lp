import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { fadeUpSoft, stagger } from '../../motion/presets';
import { heroChips } from './chips';

const CoffeeScene = lazy(() => import('./CoffeeScene'));

// Between lg and xl the column is only ~370px wide, so the chips hug the edges (the second one spills
// into the container padding) and sit above / below the cup instead of over its body.
const chipSpots = [
  { className: 'left-0 top-[2%] xl:top-[6%]', float: 7 },
  { className: '-right-8 top-[61%] xl:right-0 xl:top-[58%]', float: 9 },
  { className: 'left-0 bottom-[4%] xl:left-[4%] xl:bottom-[8%]', float: 8 },
];

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

type ChipProps = (typeof heroChips)[number] & { float: number; reduced: boolean };

function Chip({ icon: Icon, title, desc, float, reduced }: ChipProps) {
  return (
    <motion.div
      variants={fadeUpSoft}
      className="whitespace-nowrap rounded-2xl border border-white/15 bg-cafe-navy/75 px-3 py-2.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl xl:px-4 xl:py-3"
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: float, repeat: Infinity, ease: 'easeInOut' }}
        className="flex items-center gap-2.5 xl:gap-3"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cafe-coral text-white xl:h-10 xl:w-10">
          <Icon className="h-[18px] w-[18px] xl:h-5 xl:w-5" />
        </span>
        <span>
          <span className="block text-sm font-semibold leading-tight text-white xl:text-base">{title}</span>
          <span className="block text-[11px] text-white/90 xl:text-xs">{desc}</span>
        </span>
      </motion.div>
    </motion.div>
  );
}

/** Static version of the old glass card, used when WebGL is unavailable. */
function FallbackCard() {
  return (
    <motion.div variants={fadeUpSoft} className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-lg">
      <div className="space-y-6">
        {heroChips.map((c) => (
          <div key={c.title} className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-cafe-coral">
              <c.icon className="h-7 w-7 text-white" />
            </span>
            <span>
              <span className="block text-xl font-semibold">{c.title}</span>
              <span className="block text-white/80">{c.desc}</span>
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.1 });
  const reduced = useReducedMotion() ?? false;
  const [mode, setMode] = useState<'pending' | '3d' | 'fallback'>('pending');

  useEffect(() => {
    if (!hasWebGL()) {
      setMode('fallback');
      return;
    }
    // Let the text paint first; load three.js once the browser is idle.
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(() => setMode('3d'), { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(() => setMode('3d'), 400);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div ref={ref} className="relative hidden h-[520px] lg:block xl:h-[580px]" aria-hidden="true">
      {/* Warm glow behind the cup */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[300px] w-[300px] rounded-full bg-cafe-coral/30 blur-[90px] xl:h-[360px] xl:w-[360px]" />
      </div>

      {mode === '3d' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute inset-x-0 -top-56 bottom-0"
        >
          <Suspense fallback={null}>
            <CoffeeScene active={inView} reduced={reduced} />
          </Suspense>
        </motion.div>
      )}

      <motion.div
        initial="hidden"
        animate="show"
        variants={stagger(0.12, 0.7)}
        className={mode === 'fallback' ? 'relative flex h-full items-center px-8' : 'absolute inset-0'}
      >
        {mode === 'fallback' ? (
          <FallbackCard />
        ) : (
          heroChips.map((chip, i) => (
            <div key={chip.title} className={`absolute ${chipSpots[i].className}`}>
              <Chip {...chip} float={chipSpots[i].float} reduced={reduced} />
            </div>
          ))
        )}
      </motion.div>
    </div>
  );
}
