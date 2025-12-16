import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const faqs = [
  {
    question: 'Como funciona o processo de aprendizagem no Café Idiomas?',
    answer: 'Nossa metodologia combina aulas ao vivo com professores experientes, materiais interativos, prática de conversação em grupo e acompanhamento personalizado. Focamos em desenvolver fluência real, não apenas gramática.'
  },
  {
    question: 'Qual é a duração dos cursos?',
    answer: 'A maioria dos cursos dura entre 3 a 4 meses, com aulas 2-3 vezes por semana. No entanto, oferecemos programas customizados baseados em seus objetivos e disponibilidade.'
  },
  {
    question: 'Preciso ter experiência anterior para se matricular?',
    answer: 'Não! Temos cursos para todos os níveis, desde iniciantes até avançado. Nossos instrutores adaptam o ensino ao seu ritmo e experiência anterior.'
  },
  {
    question: 'As aulas são online ou presenciais?',
    answer: 'Oferecemos ambas as modalidades. Você pode escolher o que melhor se adequa à sua rotina - aulas 100% online ou presenciais em nossas unidades.'
  },
  {
    question: 'Vocês oferecem certificado?',
    answer: 'Sim! Ao completar o curso, você recebe um certificado físico e digital que comprova sua fluência no idioma escolhido.'
  },
  {
    question: 'Qual é o tamanho das turmas?',
    answer: 'Mantemos turmas pequenas (máximo 8 alunos) para garantir atenção personalizada e melhor aproveitamento das aulas.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="faq" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${isInView ? 'animate-fade-up' : 'opacity-0'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Dúvidas Frequentes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encontre respostas para as perguntas mais comuns sobre nossos cursos e metodologia
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ${
                isInView ? 'animate-fade-up' : 'opacity-0'
              }`}
              style={{
                animationDelay: isInView ? `${index * 0.05}s` : '0s',
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900 text-left">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-[#186595] transition-transform flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
