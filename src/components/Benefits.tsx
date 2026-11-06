import { motion } from 'motion/react';
import { Zap, MessageSquare, Banknote, Sparkles, Award, Coffee } from 'lucide-react';
import { fadeUp, hoverLift, revealItem, stagger, VIEWPORT } from '../motion/presets';

const benefits = [
  {
    icon: MessageSquare,
    title: 'Conversação',
    description: 'Fale com naturalidade desde a primeira aula',
    color: 'bg-cafe-navy',
  },
  {
    icon: Coffee,
    title: 'Leveza',
    description: 'Aulas dinâmicas com séries, filmes e jogos',
    color: 'bg-cafe-coral',
  },
  {
    icon: Sparkles,
    title: 'Personalização',
    description: 'Conteúdo adaptado às suas necessidades e objetivos',
    color: 'bg-cafe-navy',
  },
  {
    icon: Zap,
    title: 'Flexibilidade',
    description: 'Estude de qualquer lugar, no seu ritmo',
    color: 'bg-cafe-coral',
  },
  {
    icon: Banknote,
    title: 'Economia',
    description: 'Sem taxa de matrícula e sem taxa de material',
    color: 'bg-cafe-navy',
  },
  {
    icon: Award,
    title: 'Certificação',
    description: 'Certificado físico e digital ao final do curso',
    color: 'bg-cafe-coral',
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="bg-cafe-cream py-20 lg:py-24" aria-label="Benefícios do Café Idiomas">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={stagger(0.1)}
          className="mb-14 text-center lg:mb-16"
        >
          <motion.h2 variants={fadeUp} className="font-bold mb-4 text-4xl text-cafe-navy lg:text-5xl">
            Por que escolher a Café Idiomas?
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-lg text-cafe-ink lg:text-xl">
            Para quem está cansado de estudar anos e não conseguir falar
          </motion.p>
        </motion.div>

        <div className="mx-auto grid w-full max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              variants={fadeUp}
              {...revealItem((index % 3) * 0.1)}
              whileHover={hoverLift}
              className="rounded-2xl border border-cafe-sand/70 bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className={`${benefit.color} flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl`}>
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-cafe-ink">{benefit.title}</h3>
              </div>
              <p className="text-lg font-semibold leading-relaxed text-cafe-navy">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
