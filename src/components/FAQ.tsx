import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const faqs = [
  {
    question: 'O curso é gravado?',
    answer: 'Não. As aulas são em tempo real. Você também recebe acesso às gravações das aulas ao vivo para revisar quando quiser.'
  },
  {
    question: 'As aulas são em grupo ou individuais?',
    answer: 'As aulas são particulares, para garantir personalização total e evolução mais rápida.'
  },
  {
    question: 'Métodos de pagamento?',
    answer: 'PIX ou boleto.'
  },
  {
    question: 'O curso tem certificado?',
    answer: 'Sim! Oferecemos certificado físico e digital ao final do período contratado. Ele serve para comprovação de horas para empresas, universidades e concursos.'
  },
  {
    question: 'Posso fazer as aulas pelo celular?',
    answer: 'Sim, você pode fazer pelo computador, notebook, tablet ou celular, desde que tenha acesso à internet.'
  },
  {
    question: 'Os professores são nativos?',
    answer: 'Temos professores brasileiros fluentes e super competentes. A coordenação pedagógica avalia o perfil do aluno para indicar o melhor professor.'
  },
  {
    question: 'Em quanto tempo consigo falar?',
    answer: 'Depende da frequência e dedicação, mas a maioria dos alunos destrava a fala em menos de dois anos.'
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