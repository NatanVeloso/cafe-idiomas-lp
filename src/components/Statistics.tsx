import { Users, Award, Globe, TrendingUp } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useState, useEffect } from 'react';

const stats = [
  {
    icon: Users,
    number: 700,
    prefix: '+',
    suffix: '',
    title: 'Alunos Atendidos',
    description: 'Impacto real e resultados que falam por si'
  },
  {
    icon: Award,
    number: 9,
    prefix: '+',
    suffix: '',
    title: 'Anos de História',
    description: 'Experiência que garante qualidade e consistência'
  },
  {
    icon: Globe,
    number: 16,
    prefix: '',
    suffix: '',
    title: 'Alcance Global',
    description: 'Alunos em 11 estados e 5 países'
  },
  {
    icon: TrendingUp,
    number: 100,
    prefix: '',
    suffix: '%',
    title: 'Comunidade',
    description: 'Uma comunidade global aprendendo com nossa metodologia'
  }
];

function useCountUp(target: number, isInView: boolean, duration: number = 2000, delay: number = 0) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      let startTime: number;
      let animationFrame: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOut * target));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationFrame);
    }, delay);

    return () => clearTimeout(timeout);
  }, [target, isInView, duration, delay]);

  return count;
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const Icon = stat.icon;
  const count = useCountUp(stat.number, isInView, 2000, index * 400);

  return (
    <div
      ref={ref}
      className={`text-center transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex justify-center mb-4">
        <div className="bg-[#ee6b52] p-4 rounded-lg">
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
      <h3 className="text-4xl font-bold mb-2">
        {stat.prefix}{count}{stat.suffix}
      </h3>
      <p className="text-xl font-semibold mb-2">{stat.title}</p>
      <p className="text-blue-100">{stat.description}</p>
    </div>
  );
}

export default function Statistics() {
  const { ref: titleRef, isInView: titleInView } = useInView({ threshold: 0.1 });
  const { ref: subtitleRef, isInView: subtitleInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 bg-gradient-to-br from-[#00415d] to-[#09598f] text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className={`text-4xl lg:text-5xl font-bold mb-6 transition-all duration-700 ${
              titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Uma jornada de transformação
          </h2>
          <p
            ref={subtitleRef}
            className={`text-xl text-blue-100 max-w-2xl mx-auto transition-all duration-700 delay-150 ${
              subtitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Números que representam vidas mudadas, oportunidades conquistadas e sonhos realizados através da fluência linguística.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}