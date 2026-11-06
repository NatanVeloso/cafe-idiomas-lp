import { motion } from 'motion/react';
import { Target, Heart, TrendingUp } from 'lucide-react';
import { fadeUp, fadeUpSoft, revealItem, scaleIn, slideInLeft, stagger, VIEWPORT } from '../motion/presets';

const features = [
  {
    icon: Target,
    title: 'Metodologia Que Funciona de Verdade',
    description: 'Resultados reais através de estratégias práticas que realmente fazem diferença',
    color: 'bg-cafe-coral',
  },
  {
    icon: Heart,
    title: 'Aprendizado Humanizado',
    description: 'Professores dedicados que entendem suas necessidades e objetivos individuais',
    color: 'bg-cafe-navy',
  },
  {
    icon: TrendingUp,
    title: 'Foco em Resultados',
    description: 'Aprender uma língua estrangeira deixa de ser um sonho distante e vira parte da sua vida',
    color: 'bg-cafe-coral',
  },
];

export default function About() {
  return (
    <section id="about" className="bg-white py-20 lg:py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <motion.div initial="hidden" whileInView="show" viewport={VIEWPORT} variants={stagger(0.1)}>
            <motion.h2 variants={fadeUp} className="font-bold mb-6 text-4xl text-cafe-navy lg:text-5xl">
              Sobre Nós
            </motion.h2>
            <motion.p variants={fadeUp} className="mb-6 text-lg leading-relaxed text-cafe-ink lg:text-xl">
              A Escola Café Idiomas nasceu com uma missão clara: tornar o aprendizado de idiomas simples, eficiente e
              envolvente.
            </motion.p>
            <motion.p variants={fadeUp} className="mb-8 text-base leading-relaxed text-cafe-ink lg:text-lg">
              Acreditamos que para aprender um novo idioma não precisa ser um processo tedioso ou complicado. Nossa
              metodologia combina tecnologia, professores experientes e uma abordagem humanizada que coloca você no
              centro do processo de aprendizagem. Aqui o foco é você.
            </motion.p>

            <div className="space-y-5">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={slideInLeft}
                  {...revealItem(index * 0.12)}
                  className="flex items-start gap-4"
                >
                  <div className={`${feature.color} flex-shrink-0 rounded-lg p-3`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-cafe-navy">{feature.title}</h3>
                    <p className="text-cafe-ink">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={scaleIn}
            className="relative"
          >
            <div className="absolute inset-0 rotate-3 rounded-3xl bg-gradient-to-br from-cafe-coral/40 to-cafe-navy/30 opacity-30 blur-sm" />
            <div className="relative rounded-3xl bg-gradient-to-br from-cafe-navy to-cafe-blue p-8 text-white shadow-2xl">
              <h3 className="mb-6 text-2xl font-bold">O que nos diferencia?</h3>
              <motion.div variants={stagger(0.12, 0.2)} className="space-y-5">
                <motion.div
                  variants={fadeUpSoft}
                  className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
                >
                  <p className="text-lg leading-relaxed">
                    Não oferecemos apenas aulas de idiomas, criamos experiências transformadoras que desenvolvem sua
                    confiança e competência comunicativa.
                  </p>
                </motion.div>
                <motion.div
                  variants={fadeUpSoft}
                  className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
                >
                  <p className="text-lg leading-relaxed">
                    Nossa abordagem prática e dinâmica garante que você saia de cada aula mais preparado para se
                    comunicar no mundo real.
                  </p>
                </motion.div>
                <motion.div variants={fadeUpSoft} className="rounded-xl bg-cafe-coral p-6 shadow-lg">
                  <p className="text-xl font-semibold">Queremos te ajudar a alcançar a fluência sem enrolação!</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
