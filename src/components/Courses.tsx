import { Check } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const phoneNumber = '553499690446';

const courses = [
  {
    name: 'Inglês',
    price: 'Consultar',
    description: 'Domine o idioma mais falado do mundo, do básico ao avançado',
    level: 'Básico ao Avançado',
    message: 'Olá! Vim pelo site Café Idiomas e gostaria de saber mais sobre o curso de Inglês.',
    features: [
      'Aulas personalizadas ao seu nível',
      'Materiais didáticos inclusos',
      'Foco em conversação',
      'Certificado ao final'
    ]
  },
  {
    name: 'Inglês + Francês',
    price: 'Consultar',
    description: 'Aprenda dois idiomas e amplie suas oportunidades',
    level: 'Básico ao Avançado',
    featured: true,
    message: 'Olá! Vim pelo site Café Idiomas e gostaria de saber mais sobre o curso de Inglês + Francês.',
    features: [
      'Aulas de ambos os idiomas',
      'Materiais didáticos inclusos',
      'Foco em conversação',
      'Flexibilidade de horários',
      'Certificado ao final'
    ]
  },
  {
    name: 'Francês',
    price: 'Consultar',
    description: 'Explore a beleza da língua francesa e sua cultura',
    level: 'Básico ao Avançado',
    message: 'Olá! Vim pelo site Café Idiomas e gostaria de saber mais sobre o curso de Francês.',
    features: [
      'Aulas personalizadas ao seu nível',
      'Materiais didáticos inclusos',
      'Foco em conversação',
      'Certificado ao final'
    ]
  }
];

function CourseCard({ course, index }: { course: typeof courses[0]; index: number }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden border-2 duration-700 ${course.featured ? 'border-[#ee6b52] lg:scale-105' : 'border-gray-100'
        } ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {course.featured && (
        <div className="bg-[#ee6b52] text-white py-2 px-4 text-center font-semibold">
          Mais Popular
        </div>
      )}
      <div className="p-8">
        <h3 className="text-2xl font-bold text-[#00415d] mb-2">{course.name}</h3>
        <p className="text-[#515859] mb-4">{course.description}</p>

        <div className="mb-6">
          <p className="text-sm text-[#515859]">
            <span className="font-semibold">Nível:</span> {course.level}
          </p>
        </div>

        <div className="text-3xl font-bold text-[#00415d] mb-6">
          {course.price}
        </div>

        <ul className="space-y-3 mb-8">
          {course.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3">
              <Check className="w-5 h-5 text-[#09598f] flex-shrink-0" />
              <span className="text-[#515859]">{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(course.message)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`block text-center py-3 rounded-lg font-semibold transition-all ${course.featured
            ? 'bg-[#ee6b52] hover:bg-[#ca523c] text-white'
            : 'bg-gray-100 hover:bg-gray-200 text-[#00415d]'
            }`}
        >
          Solicitar Mais Informações
        </a>
      </div>
    </div >
  );
}

export default function Courses() {
  const { ref: titleRef, isInView: titleInView } = useInView({ threshold: 0.1 });
  const { ref: subtitleRef, isInView: subtitleInView } = useInView({ threshold: 0.1 });

  return (
    <section id="courses" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className={`text-4xl lg:text-5xl font-bold text-[#00415d] mb-4 transition-all duration-700 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            Cursos e Planos
          </h2>
          <p
            ref={subtitleRef}
            className={`text-xl text-[#515859] max-w-2xl mx-auto transition-all duration-700 delay-150 ${subtitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            Escolha o plano perfeito para sua jornada de aprendizado
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}