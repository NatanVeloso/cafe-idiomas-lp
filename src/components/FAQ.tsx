import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const faqs = [
  {
    question: 'Como funciona o processo de aprendizagem no Café Idiomas?',
    answer: 'Nossa metodologia combina aulas ao vivo com professores experientes, materiais interativos, prática de conversação e acompanhamento personalizado. Focamos em desenvolver fluência real, não apenas gramática.'
  },
  {
    question: 'Qual é a duração dos cursos?',
    answer: 'A duração varia de acordo com o nível e objetivos de cada aluno, podendo levar de alguns meses até 2 anos. Oferecemos programas personalizados que se adaptam ao seu ritmo e disponibilidade.'
  },
  {
    question: 'Preciso ter experiência anterior para se matricular?',
    answer: 'Não! Temos cursos para todos os níveis, desde iniciantes até avançado. Nossos instrutores adaptam o ensino ao seu ritmo e experiência anterior.'
  },
  {
    question: 'As aulas são online ou presenciais?',
    answer: 'As aulas são 100% online e ao vivo, com professores capacitados e experientes. Você estuda de onde estiver, com toda a interação e suporte de uma aula presencial.'
  },
  {
    question: 'Vocês oferecem certificado?',
    answer: 'Sim! Ao concluir o curso, você recebe um certificado físico e digital que comprova sua fluência no idioma escolhido.'
  },
  {
    question: 'Qual é o tamanho das turmas?',
    answer: 'As aulas são individuais, oferecendo suporte adequado a cada aluno. Assim, garantimos um acompanhamento de perto e atenção total às suas necessidades.'
  }
];

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle
}: {
  faq: typeof faqs[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`border border-gray-200 rounded-lg overflow-hidden transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span className="text-lg font-semibold text-[#00415d] text-left">
          {faq.question}
        </span>
        <ChevronDown
          className={`w-6 h-6 text-[#00415d] transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''
            }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'
          }`}
      >
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-[#515859] leading-relaxed">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref: titleRef, isInView: titleInView } = useInView({ threshold: 0.1 });
  const { ref: subtitleRef, isInView: subtitleInView } = useInView({ threshold: 0.1 });

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className={`text-4xl lg:text-5xl font-bold text-[#00415d] mb-4 transition-all duration-700 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            Dúvidas Frequentes
          </h2>
          <p
            ref={subtitleRef}
            className={`text-xl text-[#515859] max-w-2xl mx-auto transition-all duration-700 delay-150 ${subtitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            Encontre respostas para as perguntas mais comuns sobre nossos cursos e metodologia
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}