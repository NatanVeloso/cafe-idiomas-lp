import { Zap, MessageSquare, Banknote, Sparkles, Award, Coffee } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const benefits = [
  {
    icon: MessageSquare,
    title: 'CONVERSAÇÃO',
    description: 'Fale com naturalidade desde a primeira aula',
    color: 'bg-[#00415d]'
  },
  {
    icon: Coffee,
    title: 'LEVEZA',
    description: 'Aulas dinâmicas com séries, filmes e jogos',
    color: 'bg-[#ee6b52]'
  },
  {
    icon: Sparkles,
    title: 'PERSONALIZAÇÃO',
    description: 'Conteúdo adaptado às suas necessidades e objetivos',
    color: 'bg-[#00415d]'
  },
  {
    icon: Zap,
    title: 'FLEXIBILIDADE',
    description: 'Estude de qualquer lugar, no seu ritmo',
    color: 'bg-[#ee6b52]'
  },
  {
    icon: Banknote,
    title: 'ECONOMIA',
    description: 'Sem taxa de matrícula e sem taxa de material',
    color: 'bg-[#00415d]'
  },
  {
    icon: Award,
    title: 'CERTIFICAÇÃO',
    description: 'Certificado físico e digital ao final do curso',
    color: 'bg-[#ee6b52]'
  }
];

function BenefitCard({ benefit, index }: { benefit: typeof benefits[0]; index: number }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100 duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`${benefit.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
          <benefit.icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-sm font-bold text-[#515859] tracking-wider">
          {benefit.title}
        </h3>
      </div>
      <p className="text-lg font-semibold text-[#00415d] leading-relaxed">
        {benefit.description}
      </p>
    </div>
  );
}

export default function Benefits() {
  const { ref: titleRef, isInView: titleInView } = useInView({ threshold: 0.1 });
  const { ref: subtitleRef, isInView: subtitleInView } = useInView({ threshold: 0.1 });

  return (
    <section id="benefits" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className={`text-4xl lg:text-5xl font-bold text-[#00415d] mb-4 transition-all duration-700 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            Por que escolher a Café Idiomas?
          </h2>
          <p
            ref={subtitleRef}
            className={`text-xl text-[#515859] max-w-2xl mx-auto transition-all duration-700 delay-150 ${subtitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            Para quem está cansado de estudar anos e não conseguir falar
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} benefit={benefit} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}