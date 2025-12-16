import { Zap, MessageSquare, Banknote, Sparkles, Award } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const benefits = [
  {
    icon: Zap,
    title: 'FLEXIBILIDADE',
    description: 'Estude de qualquer lugar',
    color: 'bg-orange-500'
  },
  {
    icon: MessageSquare,
    title: 'CONVERSAÇÃO',
    description: 'Destrave a sua fala e escuta',
    color: 'bg-[#186595]'
  },
  {
    icon: Banknote,
    title: 'SEM TAXAS',
    description: 'Economize em taxas de matrícula e material',
    color: 'bg-orange-500'
  },
  {
    icon: Sparkles,
    title: 'LEVEZA',
    description: 'Aprenda com aulas dinâmicas e personalizadas',
    color: 'bg-[#186595]'
  },
  {
    icon: Award,
    title: 'CERTIFICAÇÃO',
    description: 'Certificado físico e/ou digital',
    color: 'bg-orange-500'
  }
];

export default function Benefits() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="benefits" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${isInView ? 'animate-fade-up' : 'opacity-0'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Por que escolher o Café Idiomas?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transforme sua jornada de aprendizado com benefícios que fazem a diferença
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100 ${
                isInView ? 'animate-fade-up' : 'opacity-0'
              }`}
              style={{
                animationDelay: isInView ? `${index * 0.1}s` : '0s',
              }}
            >
              <div className={`${benefit.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-sm font-bold text-gray-500 mb-2 tracking-wider">
                {benefit.title}
              </h3>
              <p className="text-xl font-semibold text-gray-900 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
