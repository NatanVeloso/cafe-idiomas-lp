import { Users, Award, Globe, TrendingUp } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const stats = [
  {
    icon: Users,
    number: '+700',
    title: 'Alunos Atendidos',
    description: 'Impacto real e resultados que falam por si'
  },
  {
    icon: Award,
    number: '9',
    title: 'Anos de História',
    description: 'Experiência que garante qualidade e consistência'
  },
  {
    icon: Globe,
    number: '11+5',
    title: 'Alcance Global',
    description: 'Alunos em 11 estados e 5 países'
  },
  {
    icon: TrendingUp,
    number: '100%',
    title: 'Comunidade',
    description: 'Uma comunidade global aprendendo com nossa metodologia'
  }
];

export default function Statistics() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 bg-gradient-to-br from-[#186595] to-[#0d4a6b] text-white" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-lg text-blue-200 mb-4">
            Impacto real. Resultados que falam por si.
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Uma jornada de transformação
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Números que representam vidas mudadas, oportunidades conquistadas e sonhos realizados através da fluência linguística.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`text-center transition-all duration-700 ${
                  isInView ? 'animate-fade-up' : 'opacity-0'
                }`}
                style={{
                  animationDelay: isInView ? `${index * 0.1}s` : '0s',
                }}
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-orange-500 p-4 rounded-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
                <p className="text-xl font-semibold mb-2">{stat.title}</p>
                <p className="text-blue-200">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
