import { Fragment } from 'react';
import { motion, type Variants } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';
import { useScrollToSection } from '../hooks/useScrollToSection';
import { EASE_OUT, fadeUpSoft, stagger } from '../motion/presets';
import HeroVisual from './hero/HeroVisual';
import { heroChips } from './hero/chips';

import Elisa from '../assets/Elisa.webp';
import Rejane from '../assets/Rejane.webp';
import Daniel from '../assets/Daniel.webp';
import Luiza from '../assets/Luiza.webp';

const phoneNumber = '553499690446';
const message = 'Olá! Vim pelo site Café Idiomas e gostaria de agendar uma aula demonstrativa.';
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

const trustAvatars = [Elisa, Rejane, Daniel, Luiza];

const word: Variants = {
  hidden: { opacity: 0, y: '0.45em' },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

function SplitWords({ text, accent = [] }: { text: string; accent?: string[] }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <motion.span variants={word} className={`inline-block ${accent.includes(w) ? 'text-cafe-coral' : ''}`}>
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  );
}

export default function Hero() {
  const { scrollToSection } = useScrollToSection();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cafe-navy to-cafe-blue text-white">
      {/* Ambient light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-40 h-[560px] w-[560px] rounded-full bg-cafe-coral/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-40 h-[480px] w-[480px] rounded-full bg-white/10 blur-3xl"
      />

      <div className="container relative mx-auto px-6 pb-28 pt-28 lg:px-20 lg:pb-36 lg:pt-36 xl:px-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <motion.div initial="hidden" animate="show" variants={stagger(0.09, 0.1)}>
            <motion.span
              variants={fadeUpSoft}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cafe-coral opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cafe-coral" />
              </span>
              Aulas ao vivo · Inglês e Francês
            </motion.span>

            <motion.h1
              variants={stagger(0.045)}
              className="mt-6 text-5xl font-bold leading-tight lg:text-6xl"
            >
              <SplitWords
                text="Aprenda Inglês e Francês com Naturalidade e Segurança"
                accent={['Naturalidade', 'Segurança']}
              />
            </motion.h1>

            <motion.p variants={fadeUpSoft} className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
              Aulas individuais ou em dupla, ao vivo e online. Escolha a modalidade ideal para você e aprenda com
              confiança, no seu ritmo e com foco na conversação!
            </motion.p>

            {/* Labels never break mid-word; if the row runs out of room a whole button wraps instead. */}
            <motion.div variants={fadeUpSoft} className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap lg:gap-3 xl:gap-4">
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-cafe-coral px-7 py-4 text-base font-semibold text-white shadow-[0_16px_40px_-12px_rgba(238,107,82,0.7)] transition-colors hover:bg-cafe-coral-dark sm:whitespace-nowrap sm:text-lg lg:px-6 lg:text-base xl:px-7 xl:text-lg"
              >
                Agendar aula demonstrativa
                <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
              </motion.a>
              <motion.a
                href="#about"
                onClick={(e) => scrollToSection(e, '#about')}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center rounded-full border-2 border-white/30 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:whitespace-nowrap sm:text-lg lg:px-6 lg:text-base xl:px-7 xl:text-lg"
              >
                Saiba Mais
              </motion.a>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={fadeUpSoft} className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {trustAvatars.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    width={40}
                    height={40}
                    loading="eager"
                    className="h-10 w-10 rounded-full border-2 border-cafe-navy object-cover"
                  />
                ))}
              </div>
              <div className="text-sm leading-tight">
                <div className="mb-0.5 flex gap-0.5" aria-label="5 estrelas">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-cafe-coral text-cafe-coral" />
                  ))}
                </div>
                <p className="text-white/75">
                  <strong className="font-semibold text-white">+700 alunos</strong> em 15 estados e 10 países
                </p>
              </div>
            </motion.div>

            {/* Compact chips for small screens (the 3D visual is desktop only) */}
            <motion.ul variants={fadeUpSoft} className="mt-8 flex flex-wrap gap-2 lg:hidden">
              {heroChips.map((c) => (
                <li
                  key={c.title}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm"
                >
                  <c.icon className="h-4 w-4 text-cafe-coral" />
                  {c.title}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <HeroVisual />
        </div>
      </div>

      <div className="absolute left-0 right-0" style={{ bottom: -1 }}>
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="block w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 80C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#FBF6EF"
          />
        </svg>
      </div>
    </section>
  );
}
