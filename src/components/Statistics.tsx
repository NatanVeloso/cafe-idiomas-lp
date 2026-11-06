import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Users, Award, Globe, TrendingUp } from 'lucide-react';
import { fadeUp, stagger, VIEWPORT, VIEWPORT_ITEM } from '../motion/presets';

const stats = [
  {
    icon: Users,
    number: 700,
    prefix: '+',
    suffix: '',
    title: 'Alunos Atendidos',
    description: 'Impacto real e resultados que falam por si',
  },
  {
    icon: Award,
    number: 9,
    prefix: '+',
    suffix: '',
    title: 'Anos de História',
    description: 'Experiência que garante qualidade e consistência',
  },
  {
    icon: Globe,
    number: 21,
    prefix: '',
    suffix: '',
    title: 'Alcance Global',
    description: 'Alunos em 15 estados e 10 países',
  },
  {
    icon: TrendingUp,
    number: 100,
    prefix: '',
    suffix: '%',
    title: 'Comunidade',
    description: 'Uma comunidade global aprendendo com nossa metodologia',
  },
];

function useCountUp(target: number, start: boolean, duration = 1800, delay = 0) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let frame = 0;
    const timeout = setTimeout(() => {
      let t0: number | null = null;
      const tick = (now: number) => {
        if (t0 === null) t0 = now;
        const progress = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [target, start, duration, delay]);

  return count;
}

function StatCard({ stat, index }: { stat: (typeof stats)[number]; index: number }) {
  const Icon = stat.icon;
  const ref = useRef<HTMLDivElement>(null);
  // Each stat reveals (and starts counting) when it scrolls into view itself.
  const inView = useInView(ref, VIEWPORT_ITEM);
  const delay = (index % 4) * 0.12;
  const count = useCountUp(stat.number, inView, 1800, delay * 1000 + 150);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className="text-center"
    >
      <div className="mb-4 flex justify-center">
        <div className="rounded-xl bg-cafe-coral p-4 shadow-[0_12px_30px_-10px_rgba(238,107,82,0.8)]">
          <Icon className="h-8 w-8 text-white" />
        </div>
      </div>
      <h3 className="mb-2 text-4xl font-bold tabular-nums">
        {stat.prefix}
        {count}
        {stat.suffix}
      </h3>
      <p className="mb-2 text-xl font-semibold">{stat.title}</p>
      <p className="text-cafe-cream/80">{stat.description}</p>
    </motion.div>
  );
}

export default function Statistics() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cafe-navy to-cafe-blue py-20 text-white lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-cafe-coral/15 blur-3xl"
      />
      <div className="container relative mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={stagger(0.1)}
          className="mb-16 text-center"
        >
          <motion.h2 variants={fadeUp} className="font-bold mb-6 text-4xl lg:text-5xl">
            Uma jornada de transformação
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-lg text-cafe-cream/80 lg:text-xl">
            Números que representam vidas mudadas, oportunidades conquistadas e sonhos realizados através da fluência
            linguística.
          </motion.p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.title} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
