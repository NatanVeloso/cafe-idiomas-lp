import { motion } from 'motion/react';
import {
  ArrowRight,
  Briefcase,
  Clapperboard,
  Globe,
  MessageSquare,
  Plane,
  Sprout,
  type LucideIcon,
} from 'lucide-react';
import { fadeUp, hoverLift, revealItem, stagger, VIEWPORT } from '../motion/presets';
import { PAGE_LANGUAGE, whatsappMessage } from '../variant';

/**
 * Seção exclusiva de /ingles e /frances: para que serve o idioma da página.
 * Na home ela não aparece (o App só a monta quando há `PAGE_LANGUAGE`).
 */

const phoneNumber = '553499690446';

type Goal = { icon: LucideIcon; title: string; description: string };
type Content = { title: string; subtitle: string; goals: Goal[] };

const CONTENT: Record<'ingles' | 'frances', Content> = {
  ingles: {
    title: 'Para que você quer o inglês?',
    subtitle:
      'Cada aluno chega com um objetivo diferente. As aulas são montadas em cima do seu, e não de um roteiro igual para todo mundo.',
    goals: [
      {
        icon: MessageSquare,
        title: 'Destravar a fala',
        description: 'Você entende, mas trava na hora de responder? A conversa vira o centro da aula desde o primeiro dia.',
      },
      {
        icon: Briefcase,
        title: 'Crescer no trabalho',
        description: 'Reuniões, entrevistas, apresentações e e-mails sem aquele frio na barriga.',
      },
      {
        icon: Plane,
        title: 'Viajar com autonomia',
        description: 'Do check-in ao restaurante, resolva tudo sozinho e aproveite a viagem de verdade.',
      },
      {
        icon: Clapperboard,
        title: 'Séries e filmes no original',
        description: 'Entenda o que você já gosta de assistir e ouvir, sem depender da legenda.',
      },
    ],
  },
  frances: {
    title: 'Por que aprender francês?',
    subtitle:
      'O francês abre portas na Europa, no Canadá e além. E dá para começar do zero, no seu ritmo, com aulas montadas para o seu objetivo.',
    goals: [
      {
        icon: Sprout,
        title: 'Começar do zero',
        description: 'Não precisa saber nada: você vai do bonjour às primeiras conversas com o professor do seu lado.',
      },
      {
        icon: Globe,
        title: 'Estudar ou morar fora',
        description: 'França, Canadá, Bélgica, Suíça: o idioma é o primeiro passo para um intercâmbio ou uma nova fase.',
      },
      {
        icon: Plane,
        title: 'Viajar conversando',
        description: 'De Paris a Montreal, peça, pergunte e converse com quem é de lá.',
      },
      {
        icon: Clapperboard,
        title: 'Cultura no original',
        description: 'Filmes, músicas e livros em francês, sem depender de tradução.',
      },
    ],
  },
};

const demoMessage = whatsappMessage(
  'Olá! Vim pelo site Café Idiomas e gostaria de agendar uma aula demonstrativa.',
  (curso) => `Olá! Vim pelo site Café Idiomas e gostaria de agendar uma aula demonstrativa de ${curso}.`,
);

export default function LanguageGoals() {
  if (!PAGE_LANGUAGE) return null;
  const content = CONTENT[PAGE_LANGUAGE];

  return (
    <section id="objetivos" className="bg-white py-20 lg:py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <motion.div initial="hidden" whileInView="show" viewport={VIEWPORT} variants={stagger(0.1)}>
            <motion.h2 variants={fadeUp} className="mb-5 text-4xl font-bold text-cafe-navy lg:text-5xl">
              {content.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="mb-8 text-lg leading-relaxed text-cafe-ink lg:text-xl">
              {content.subtitle}
            </motion.p>
            <motion.a
              variants={fadeUp}
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(demoMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 rounded-full bg-cafe-coral px-7 py-4 font-semibold text-white shadow-[0_16px_40px_-12px_rgba(238,107,82,0.7)] transition-colors hover:bg-cafe-coral-dark"
            >
              Agendar aula demonstrativa
              <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2">
            {content.goals.map((goal, index) => (
              <motion.div
                key={goal.title}
                variants={fadeUp}
                {...revealItem((index % 2) * 0.1)}
                whileHover={hoverLift}
                className="rounded-2xl border border-cafe-sand/70 bg-cafe-cream p-6 transition-shadow duration-300 hover:shadow-card-hover"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cafe-navy">
                  <goal.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-cafe-navy">{goal.title}</h3>
                <p className="leading-relaxed text-cafe-ink">{goal.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
