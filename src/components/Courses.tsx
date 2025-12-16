import { Check } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const courses = [
  {
    name: 'Inglês Básico',
    price: 'Consultar',
    description: 'Comece sua jornada no idioma mais falado do mundo',
    duration: '3 meses',
    level: 'Iniciante',
    features: [
      'Aulas 2x por semana',
      'Materiais didáticos inclusos',
      'Acesso a comunidade',
      'Certificado ao final'
    ]
  },
  {
    name: 'Inglês Intermediário',
    price: 'Consultar',
    description: 'Desenvolva fluência em conversações do dia a dia',
    duration: '4 meses',
    level: 'Intermediário',
    featured: true,
    features: [
      'Aulas 3x por semana',
      'Materiais didáticos inclusos',
      'Acesso a comunidade',
      'Prática de conversação intensiva',
      'Certificado ao final'
    ]
  },
  {
    name: 'Francês',
    price: 'Consultar',
    description: 'Explore a beleza da língua francesa e sua cultura',
    duration: '3 meses',
    level: 'Iniciante a Intermediário',
    features: [
      'Aulas 2x por semana',
      'Materiais didáticos inclusos',
      'Acesso a comunidade',
      'Certificado ao final'
    ]
  }
];

export default function Courses() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="courses" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${isInView ? 'animate-fade-up' : 'opacity-0'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Cursos e Planos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Escolha o plano perfeito para sua jornada de aprendizado
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {courses.map((course, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 ${
                course.featured ? 'border-orange-500 lg:scale-105' : 'border-gray-100'
              } ${isInView ? 'animate-fade-up' : 'opacity-0'}`}
              style={{
                animationDelay: isInView ? `${index * 0.1}s` : '0s',
              }}
            >
              {course.featured && (
                <div className="bg-orange-500 text-white py-2 px-4 text-center font-semibold">
                  Mais Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.name}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>

                <div className="mb-6 space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Duração:</span> {course.duration}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Nível:</span> {course.level}
                  </p>
                </div>

                <div className="text-3xl font-bold text-[#186595] mb-6">
                  {course.price}
                </div>

                <ul className="space-y-3 mb-8">
                  {course.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`block text-center py-3 rounded-lg font-semibold transition-all ${
                    course.featured
                      ? 'bg-orange-500 hover:bg-orange-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  Solicitar Mais Informações
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
