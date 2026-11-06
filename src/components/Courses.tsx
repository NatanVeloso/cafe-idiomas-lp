import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { fadeUp, hoverLift, revealItem, stagger, VIEWPORT } from '../motion/presets';

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
      { frequency: '2x por semana', price: 'R$ 580', period: 'por pessoa/mês' },
    ],
    features: [
      'Aprendizado com troca entre alunos',
      'Ideal para amigos, casais ou familiares',
      'Gravação das aulas para revisão',
      'Plataforma exclusiva',
      'Material didático incluso',
      'Certificado de conclusão',
    ],
    cta: 'Quero garantir minha vaga',
  },
  {
    name: 'Plano VIP',
    description: 'Para quem quer aulas individuais, personalizadas e com atenção total do professor.',
    featured: true,
    badge: 'Mais escolhido',
    message: 'Olá! Vim pelo site Café Idiomas e gostaria de saber mais sobre o Plano VIP.',
    plans: [
      { frequency: '1x por semana', price: 'R$ 455', period: 'por mês' },
      { frequency: '2x por semana', price: 'R$ 860', period: 'por mês' },
    ],
    features: [
      'Aulas particulares ao vivo e online',
      'Maior flexibilidade de ritmo e conteúdo',
      'Gravação das aulas para revisão',
      'Plataforma exclusiva',
      'Material didático incluso',
      'Certificado de conclusão',
    ],
    cta: 'Quero garantir minha vaga',
  },
  {
    name: 'Plano Trilíngue',
    description: 'Para quem deseja combinar inglês e francês de forma flexível e com condições especiais.',
    message:
      'Olá! Vim pelo site Café Idiomas e gostaria de solicitar um orçamento do Plano Trilíngue (inglês + francês).',
    customQuote: {
      title: 'Orçamento sob medida',
      subtitle: 'Monte a combinação ideal com a escola',
    },
    features: [
      'Combine inglês e francês como preferir',
      'Mais liberdade para criar sua rotina',
      'Indicado para objetivos personalizados',
    ],
    cta: 'Solicitar orçamento',
  },
];

function CourseCard({ course, index }: { course: Course; index: number }) {
  return (
    // The featured scale lives on a plain wrapper: motion writes its own inline transform on the card,
    // which would otherwise wipe out Tailwind's scale.
    <div className={course.featured ? 'lg:scale-105' : undefined}>
    <motion.div
      variants={fadeUp}
      {...revealItem((index % 3) * 0.12)}
      whileHover={hoverLift}
      className={`relative overflow-hidden rounded-2xl border-2 bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover ${
        course.featured ? 'border-cafe-coral' : 'border-cafe-sand/70'
      }`}
    >
      {course.featured && (
        <div className="bg-cafe-coral px-4 py-2 text-center text-sm font-semibold uppercase tracking-wider text-white">
          {course.badge}
        </div>
      )}
      <div className="p-6 sm:p-8">
        <h3 className="mb-2 text-2xl font-bold text-cafe-navy">{course.name}</h3>
        <p className="mb-5 text-cafe-ink">{course.description}</p>

        {course.plans && (
          <div className="mb-6 space-y-3">
            {course.plans.map((plan, i) => (
              <div
                key={plan.frequency}
                className={`flex items-center justify-between rounded-xl p-3 ${
                  i === 1 ? 'border border-cafe-navy/10 bg-cafe-navy/5' : 'bg-cafe-cream'
                }`}
              >
                <span className="text-sm font-medium text-cafe-ink">{plan.frequency}</span>
                <div className="text-right">
                  <span className="text-xl font-bold text-cafe-navy">{plan.price}</span>
                  <span className="block text-xs text-cafe-ink">{plan.period}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {course.customQuote && (
          <div className="mb-6 rounded-xl bg-cafe-cream p-6 text-center">
            <p className="text-lg font-bold text-cafe-navy">{course.customQuote.title}</p>
            <p className="mt-1 text-sm text-cafe-ink">{course.customQuote.subtitle}</p>
          </div>
        )}

        <ul className="mb-8 space-y-3">
          {course.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-cafe-blue/10">
                <Check className="h-3.5 w-3.5 text-cafe-blue" strokeWidth={3} />
              </span>
              <span className="text-sm text-cafe-ink">{feature}</span>
            </li>
          ))}
        </ul>

        <motion.a
          href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(course.message)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${course.cta} - ${course.name}`}
          whileTap={{ scale: 0.97 }}
          className={`block rounded-xl py-3.5 text-center font-semibold transition-colors ${
            course.featured
              ? 'bg-cafe-coral text-white shadow-[0_12px_30px_-10px_rgba(238,107,82,0.8)] hover:bg-cafe-coral-dark'
              : 'bg-cafe-cream-2 text-cafe-navy hover:bg-cafe-sand'
          }`}
        >
          {course.cta}
        </motion.a>
      </div>
    </motion.div>
    </div>
  );
}

export default function Courses() {
  return (
    <section id="courses" className="bg-cafe-cream py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={stagger(0.1)}
          className="mb-10 text-center sm:mb-16"
        >
          <motion.h2 variants={fadeUp} className="font-bold mb-3 text-3xl text-cafe-navy sm:mb-4 sm:text-4xl lg:text-5xl">
            Cursos e Planos
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto max-w-3xl text-base text-cafe-ink sm:text-lg lg:text-xl">
            Escolha como você quer aprender!
            <br />
            Seja com atenção exclusiva ou compartilhando a experiência com outra pessoa, temos o plano ideal para você
            alcançar seus objetivos.
          </motion.p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {courses.map((course, index) => (
            <CourseCard key={course.name} course={course} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
