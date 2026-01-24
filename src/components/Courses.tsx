import { Check } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const phoneNumber = '553499690446';

const courses = [
  {
    name: 'Inglês',
    description: 'Domine o idioma mais falado do mundo, do básico ao avançado',
    level: 'Básico ao Avançado',
    message: 'Olá! Vim pelo site Café Idiomas e gostaria de saber mais sobre o curso de Inglês.',
    plans: [
      { frequency: '1x por semana', price: 'R$ 420', period: '/mês' },
      { frequency: '2x por semana', price: 'R$ 810', period: '/mês' }
    ],
    features: [
      'Aulas particulares ao vivo e online',
      'Acesso às aulas gravadas',
      'Plataforma exclusiva',
      'Material exclusivo incluso',
      'Certificado físico e digital',
      'Relatório semestral de evolução',
      'Cronograma semanal de estudo',
      'Método focado em conversação e fluência'
    ]
  },
  {
    name: 'Inglês + Francês',
    description: 'Aprenda dois idiomas e amplie suas oportunidades',
    level: 'Básico ao Avançado',
    featured: true,
    message: 'Olá! Vim pelo site Café Idiomas e gostaria de saber mais sobre o curso de Inglês + Francês.',
    plans: [
      { frequency: '1x por semana', price: 'R$ 740', period: '/mês' },
      { frequency: '2x por semana', price: 'R$ 1.450', period: '/mês' }
    ],
    features: [
      'Aulas particulares ao vivo e online',
      'Acesso às aulas gravadas',
      'Plataforma exclusiva',
      'Material exclusivo incluso',
      'Certificado físico e digital',
      'Relatório semestral de evolução',
      'Cronograma semanal de estudo',
      'Método focado em conversação e fluência',
      'Flexibilidade entre os dois idiomas'
    ]
  },
  {
    name: 'Francês',
    description: 'Explore a beleza da língua francesa e sua cultura',
    level: 'Básico ao Avançado',
    message: 'Olá! Vim pelo site Café Idiomas e gostaria de saber mais sobre o curso de Francês.',
    plans: [
      { frequency: '1x por semana', price: 'R$ 390', period: '/mês' },
      { frequency: '2x por semana', price: 'R$ 750', period: '/mês' }
    ],
    features: [
      'Aulas particulares ao vivo e online',
      'Acesso às aulas gravadas',
      'Plataforma exclusiva',
      'Material exclusivo incluso',
      'Certificado físico e digital',
      'Relatório semestral de evolução',
      'Cronograma semanal de estudo',
      'Método focado em conversação e fluência'
    ]
  }
];

function CourseCard({ course, index }: { course: typeof courses[0]; index: number }) {
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
          Mais Popular
        </div>
      )}
      <div className="p-6 sm:p-8">
        <h3 className="text-2xl font-bold text-[#00415d] mb-2">{course.name}</h3>
        <p className="text-[#515859] mb-4">{course.description}</p>

        <div className="mb-6">
          <p className="text-sm text-[#515859]">
            <span className="font-semibold">Nível:</span> {course.level}
          </p>
        </div>

        {/* Opções de preço */}
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
                <span className="text-sm text-[#515859]">{plan.period}</span>
              </div>
            </div>
          ))}
        </div>

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
          className={`block text-center py-3 rounded-lg font-semibold transition-all ${
            course.featured
              ? 'bg-[#ee6b52] hover:bg-[#ca523c] text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-[#00415d]'
          }`}
        >
          Quero garantir minha vaga
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
            className={`text-base sm:text-lg lg:text-xl text-[#515859] max-w-2xl mx-auto transition-all duration-700 delay-150 ${
              subtitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Escolha o plano perfeito para sua jornada de aprendizado
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