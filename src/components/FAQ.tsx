import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { EASE_OUT, fadeUp, fadeUpSoft, revealItem, stagger, VIEWPORT } from '../motion/presets';
import { PAGE_LANGUAGE } from '../variant';

type Faq = { question: string; answer: string };

/** Perguntas que só aparecem nas páginas de idioma, antes das gerais. */
const languageFaqs: Record<'ingles' | 'frances', Faq[]> = {
  ingles: [
    {
      question: 'Estudei inglês por anos e ainda não consigo falar. O curso serve para mim?',
      answer:
        'Serve, e é justamente para esse perfil. As aulas são ao vivo e focadas em conversação desde a primeira aula, com conteúdo adaptado ao que você já sabe e ao que trava a sua fala.',
    },
    {
      question: 'Já tenho uma base de inglês. Vou ter que começar do básico?',
      answer:
        'Não. A coordenação pedagógica avalia o seu nível e os seus objetivos para indicar o professor e o ponto de partida certos. Como o conteúdo é personalizado, você não perde tempo revendo o que já domina.',
    },
  ],
  frances: [
    {
      question: 'Nunca estudei francês. Consigo acompanhar?',
      answer:
        'Consegue. As aulas são individuais ou em dupla, então o ritmo é o seu e o professor acompanha cada passo, do zero às primeiras conversas.',
    },
    {
      question: 'Francês é difícil para quem fala português?',
      answer:
        'Menos do que parece. Por ser uma língua latina, o francês tem muito vocabulário parecido com o português, o que ajuda bastante no começo. A pronúncia pede prática, e por isso as aulas focam em conversação desde o início.',
    },
    {
      question: 'Já tenho uma base de francês. Vou ter que começar do básico?',
      answer:
        'Não. A coordenação pedagógica avalia o seu nível e os seus objetivos para indicar o professor e o ponto de partida certos. Como o conteúdo é personalizado, você não perde tempo revendo o que já domina.',
    },
  ],
};

const generalFaqs: Faq[] = [
  {
    question: 'O curso é gravado?',
    answer:
      'Não. As aulas são em tempo real. Você também recebe acesso às gravações das aulas ao vivo para revisar quando quiser.',
  },
  {
    question: 'As aulas são em grupo ou individuais?',
    answer:
      'Oferecemos duas modalidades: o Plano VIP, com aulas individuais e atenção exclusiva do professor, e o Plano Dupla, com aulas para duas pessoas. Ambas são ao vivo, online e focadas no desenvolvimento da comunicação.',
  },
  {
    question: 'Métodos de pagamento?',
    answer: 'PIX ou boleto.',
  },
  {
    question: 'O curso tem certificado?',
    answer:
      'Sim! Oferecemos certificado físico e digital ao final do período contratado. Ele serve para comprovação de horas para empresas, universidades e concursos.',
  },
  {
    question: 'Posso fazer as aulas pelo celular?',
    answer: 'Sim, você pode fazer pelo computador, notebook, tablet ou celular, desde que tenha acesso à internet.',
  },
  {
    question: 'Os professores são nativos?',
    answer:
      'Temos professores brasileiros fluentes e super competentes. A coordenação pedagógica avalia o perfil do aluno para indicar o melhor professor.',
  },
  {
    question: 'Em quanto tempo consigo falar?',
    answer: 'Depende da frequência e dedicação, mas boa parte dos alunos destrava a fala entre 2 e 4 anos de curso.',
  },
  {
    question: 'Posso estudar com um amigo ou familiar?',
    answer:
      'Sim! O Plano Dupla é uma ótima opção para amigos, casais ou familiares que desejam aprender juntos. É importante considerar a compatibilidade de níveis e objetivos para aproveitar melhor as aulas.',
  },
];

const faqs: Faq[] = PAGE_LANGUAGE ? [...languageFaqs[PAGE_LANGUAGE], ...generalFaqs] : generalFaqs;

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: Faq;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = `faq-panel-${index}`;

  return (
    <motion.div
      variants={fadeUpSoft}
      {...revealItem(Math.min(index, 4) * 0.06)}
      className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-300 ${
        isOpen ? 'border-cafe-coral/40 shadow-card' : 'border-cafe-sand hover:border-cafe-navy/20'
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-lg font-semibold text-cafe-navy">{faq.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
            isOpen ? 'bg-cafe-coral text-white' : 'bg-cafe-cream-2 text-cafe-navy'
          }`}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.35, ease: EASE_OUT }, opacity: { duration: 0.25 } }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0">
              <p className="leading-relaxed text-cafe-ink">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-white py-20 lg:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={stagger(0.1)}
          className="mb-14 text-center lg:mb-16"
        >
          <motion.h2 variants={fadeUp} className="font-bold mb-4 text-4xl text-cafe-navy lg:text-5xl">
            Dúvidas Frequentes
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-lg text-cafe-ink lg:text-xl">
            Encontre respostas para as perguntas mais comuns sobre nossos cursos e metodologia
          </motion.p>
        </motion.div>

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
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
