import { Check } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const phoneNumber = '553499690446';

type Plan = { frequency: string; price: string; period: string };

type Course = {
  name: string;
  description: string;
  featured?: boolean;
  badge?: string;
  message: string;
  plans?: Plan[];
  customQuote?: { title: string; subtitle: string };
  features: string[];
  cta: string;
};

const courses: Course[] = [
  {
    name: 'Plano Dupla',
    description: 'Para quem quer aprender com mais interação e dividir a experiência com outra pessoa.',
    message: 'Olá! Vim pelo site Café Idiomas e gostaria de saber mais sobre o Plano Dupla.',
    plans: [
      { frequency: '1x por semana', price: 'R$ 320', period: 'por pessoa/mês' },
      { frequency: '2x por semana', price: 'R$ 580', period: 'por pessoa/mês' }
    ],
    features: [
      'Aprendizado com troca entre alunos',
      'Ideal para amigos, casais ou familiares',
      'Gravação das aulas para revisão',
      'Plataforma exclusiva',
      'Material didático incluso',
      'Certificado de conclusão'
    ],
    cta: 'Quero garantir minha vaga'
  },
  {
    name: 'Plano VIP',
    description: 'Para quem quer aulas individuais, personalizadas e com atenção total do professor.',
    featured: true,
    badge: 'Mais escolhido',
    message: 'Olá! Vim pelo site Café Idiomas e gostaria de saber mais sobre o Plano VIP.',
    plans: [
      { frequency: '1x por semana', price: 'R$ 455', period: 'por mês' },
      { frequency: '2x por semana', price: 'R$ 860', period: 'por mês' }
    ],
    features: [
      'Aulas particulares ao vivo e online',
      'Maior flexibilidade de ritmo e conteúdo',
      'Gravação das aulas para revisão',
      'Plataforma exclusiva',
      'Material didático incluso',
      'Certificado de conclusão'
    ],
    cta: 'Quero garantir minha vaga'
  },
  {
    name: 'Plano Trilíngue',
    description: 'Para quem deseja combinar inglês e francês de forma flexível e com condições especiais.',
    message: 'Olá! Vim pelo site Café Idiomas e gostaria de solicitar um orçamento do Plano Trilíngue (inglês + francês).',
    customQuote: {
      title: 'Orçamento sob medida',
      subtitle: 'Monte a combinação ideal com a escola'
    },
    features: [
      'Combine inglês e francês como preferir',
      'Mais liberdade para criar sua rotina',
      'Indicado para objetivos personalizados'
    ],
    cta: 'Solicitar orçamento'
  }
];

function CourseCard({ course, index }: { course: Course; index: number }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border-2 duration-700 ${
        course.featured ? 'border-[#ee6b52] lg:scale-105' : 'border-gray-100'
      } ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {course.featured && (
        <div className="bg-[#ee6b52] text-white py-2 px-4 text-center font-semibold">
          {course.badge}
        </div>
      )}
      <div className="p-6 sm:p-8">
        <h3 className="text-2xl font-bold text-[#00415d] mb-2">{course.name}</h3>
        <p className="text-[#515859] mb-4">{course.description}</p>


        {/* Opções de preço */}
        {course.plans && (
          <div className="space-y-3 mb-6">
            {course.plans.map((plan, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  i === 1 ? 'bg-[#00415d]/5 border border-[#00415d]/10' : 'bg-gray-50'
                }`}
              >
                <span className="text-sm text-[#515859] font-medium">{plan.frequency}</span>
                <div className="text-right">
                  <span className="text-xl font-bold text-[#00415d]">{plan.price}</span>
                  <span className="block text-xs text-[#515859]">{plan.period}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {course.customQuote && (
          <div className="mb-6 p-6 rounded-lg bg-gray-50 text-center">
            <p className="text-lg font-bold text-[#00415d]">{course.customQuote.title}</p>
            <p className="text-sm text-[#515859] mt-1">{course.customQuote.subtitle}</p>
          </div>
        )}

        <ul className="space-y-3 mb-8">
          {course.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#09598f] flex-shrink-0 mt-0.5" />
              <span className="text-[#515859] text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(course.message)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${course.cta} - ${course.name}`}
          className={`block text-center py-3 rounded-lg font-semibold transition-all ${
            course.featured
              ? 'bg-[#ee6b52] hover:bg-[#ca523c] text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-[#00415d]'
          }`}
        >
          {course.cta}
        </a>
      </div>
    </div>
  );
}

export default function Courses() {
  const { ref: titleRef, isInView: titleInView } = useInView({ threshold: 0.1 });
  const { ref: subtitleRef, isInView: subtitleInView } = useInView({ threshold: 0.1 });

  return (
    <section id="courses" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <h2
            ref={titleRef}
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[#00415d] mb-3 sm:mb-4 transition-all duration-700 ${
              titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Cursos e Planos
          </h2>
          <p
            ref={subtitleRef}
            className={`text-base sm:text-lg lg:text-xl text-[#515859] max-w-6xl mx-auto transition-all duration-700 delay-150 ${
              subtitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Escolha como você quer aprender!
            <br />
            Seja com atenção exclusiva ou compartilhando a experiência com outra pessoa, temos o plano ideal para você alcançar seus objetivos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}