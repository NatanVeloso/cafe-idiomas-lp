import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Quote, Star, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { EASE_OUT, fadeIn, fadeUp, stagger, VIEWPORT, VIEWPORT_ITEM } from '../motion/presets';

import kaike from '../assets/Kaike.webp';
import Heila from '../assets/Heila.webp';
import Elisa from '../assets/Elisa.webp';
import Luiza from '../assets/Luiza.webp';
import Rejane from '../assets/Rejane.webp';
import Daniel from '../assets/Daniel.webp';
import Nathaly from '../assets/Nathaly.webp';

const testimonials = [
  {
    name: 'Kaique Santos',
    course: 'Inglês Iniciante',
    text: 'Foi a melhor escola de idiomas que eu frequentei. O melhor de tudo é que eu nem preciso sair de casa, pegar trânsito. Muito prático!',
    rating: 5,
    img: kaike,
  },
  {
    name: 'Heila Carolina',
    course: 'Francês Básico',
    text: 'Gostaria de registrar meu sincero agradecimento à escola Café Idiomas e, em especial, à professora Thaís. Sua paciência, cordialidade e dedicação fazem toda a diferença no processo de aprendizado. Destaco também o método de aprendizado lúdico adotado pela escola, que torna as aulas mais dinâmicas, prazerosas e eficazes, além do formato de aula individual, que realmente faz toda a diferença no desenvolvimento do aluno. Não posso deixar de elogiar a secretária Bia, sempre muito atenciosa, prestativa e eficiente, contribuindo para que toda a experiência com a escola seja ainda mais positiva. Parabéns a toda a equipe pelo excelente trabalho!',
    rating: 5,
    img: Heila,
  },
  {
    name: 'Elisa Griebeller',
    course: 'Inglês Avançado + Francês Iniciante',
    text: 'A metodologia é muito divertida e eficiente, o que resulta em um aprendizado rápido e eficaz. Já avancei no curso de inglês e iniciei o francês conjuntamente. Recomendo ambos os cursos e professores que são maravilhosos.',
    rating: 5,
    img: Elisa,
  },
  {
    name: 'Rejane Dias',
    course: 'Inglês Intermediário',
    text: 'As aulas na Café com Idiomas fizeram toda a diferença na aprovação do meu mestrado, especialmente porque a primeira fase exigia prova de proficiência. Durante as aulas, recebi orientações fundamentais sobre como traduzir textos, identificar palavras-chave e responder às questões com mais segurança e precisão. Sem a ajuda da professora e do suporte da escola, teria sido muito difícil alcançar uma nota tão relevante. Só tenho a agradecer pela simpatia, profissionalismo e excelente didática de toda a equipe. Parabéns pelo trabalho e muito sucesso sempre!',
    rating: 5,
    img: Rejane,
  },
  {
    name: 'Daniel Fenris',
    course: 'Pai de aluna Inglês Avançado',
    text: 'Minha esposa e filha são alunas da Café Idiomas e isso mudou nossa família. Mudou não só o lazer, como compreender séries e filmes, além das interações em casa também ampliou os objetivos de vida. Minha esposa agora busca uma certificação internacional em contabilidade e minha filha fará processo seletivo para universidades nos EUA. Meu caçula anseia atingir a idade para iniciar as aulas e passar a entender os jogos de computador, que faço questão de deixar tudo em inglês.',
    rating: 5,
    img: Daniel,
  },
  {
    name: 'Luiza Fariello',
    course: 'Ex-aluna de Inglês',
    text: 'O que eu mais gostei na Café Idiomas foi a personalização do atendimento, as aulas atenderam exatamente aquilo que eu precisava, conversação em nível avançado. O professor foi muito atencioso, adaptando a aula quando preciso, sempre de forma criativa para não ficar monótono, e em seis meses eu já estava muito mais fluente e segura. Além disso, o diploma foi essencial para que eu ingressasse no doutorado.',
    rating: 5,
    img: Luiza,
  },
  {
    name: 'Beatriz Fariello',
    course: 'Inglês Intermediário',
    text: 'Adoro estudar inglês na Café idiomas, melhorei bastante minha conversação e entendimento da língua no último ano. Minha parte favorita das aulas são os filmes que assistimos ao longo dos capítulos, além de serem muito divertidos, as histórias me fazem prestar mais atenção na matéria e ver o que estamos estudando sendo usado na prática.',
    rating: 5,
  },
  {
    name: 'Nathaly Rodrigues',
    course: 'Ex-aluna Inglês',
    text: 'Ao longo da minha vida, desde criança, eu passei por inúmeras escolas de idiomas e nunca havia conseguido dar continuidade nos cursos, por não entender a forma como era explicado, nem fixar o conteúdo. Achava que era porque eu não tinha habilidades de retenção do aprendizado desse idioma, até que me apaixonei por missões transculturais (cristã) e queria muito usar o idioma para expandir minha missão, também tinha o desejo de fazer um intercâmbio algum dia. Foi assim que conheci a Café Idiomas [...] e me encantei pelo método de estudo, era personalizado, didático, com a prática na conversação que era o meu foco [...]. Consegui fazer meu intercâmbio para o Canadá em 2019, a experiência em cursar a Café Idiomas tornou minha adaptação muito mais simples, [...] e o inglês aprendido nesse tempo foi fundamental para eu conseguir me comunicar com as pessoas e entender o que elas falavam. Nessa época meus filhos eram bem pequenos, mas já plantava neles o interesse pelo inglês, quando então completaram a idade pra cursar (2024) não existia outra escola que eu pensaria em matriculá-los senão a Café Idiomas, eles iniciaram Inglês e Francês de forma individualizada e avançaram no idioma em pouco tempo [...]. Sem dúvidas a Café Idiomas tem como seu diferencial: a educação individualizada e humanizada e adicionam muito com a didática específica que prendem a atenção do aluno, o que é muito diferente das escolas convencionais. Foi e tem sido uma bênção para nossa família.',
    rating: 5,
    img: Nathaly,
  },
];

type Testimonial = (typeof testimonials)[number];

const MAX_TEXT_LENGTH = 150;

/** Soft fade on both sides of the carousel; --fade is set per breakpoint on the element. */
const carouselMask =
  'linear-gradient(to right, transparent 0, #000 calc(var(--fade) - 0.75rem), #000 calc(100% - var(--fade) + 0.75rem), transparent 100%)';

function truncateText(text: string, maxLength: number): { truncated: string; isTruncated: boolean } {
  if (text.length <= maxLength) {
    return { truncated: text, isTruncated: false };
  }
  return { truncated: text.slice(0, maxLength).trim() + '...', isTruncated: true };
}

function Avatar({ testimonial, size }: { testimonial: Testimonial; size: 'sm' | 'lg' }) {
  const dims = size === 'lg' ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-10 h-10 sm:w-12 sm:h-12';
  if (testimonial.img) {
    return (
      <img
        src={testimonial.img}
        alt={testimonial.name}
        loading="lazy"
        className={`${dims} flex-shrink-0 rounded-full border-2 border-cafe-coral/20 object-cover`}
      />
    );
  }
  return (
    <div className={`${dims} flex flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cafe-navy to-cafe-coral`}>
      <span className={`font-bold text-white ${size === 'lg' ? 'text-lg sm:text-xl' : 'text-xs sm:text-sm'}`}>
        {testimonial.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()}
      </span>
    </div>
  );
}

function Stars({ count, className }: { count: number; className: string }) {
  return (
    <div className="flex">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className={`${className} fill-cafe-coral text-cafe-coral`} />
      ))}
    </div>
  );
}

function TestimonialModal({ testimonial, onClose }: { testimonial: Testimonial; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-cafe-navy/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 8 }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-cafe-cream-2 p-2 transition-colors hover:bg-cafe-sand"
          aria-label="Fechar"
        >
          <X className="h-5 w-5 text-cafe-ink" />
        </button>

        <div className="p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-4">
            <Avatar testimonial={testimonial} size="lg" />
            <div>
              <h3 className="text-lg font-bold text-cafe-navy sm:text-xl">{testimonial.name}</h3>
              <p className="text-sm text-cafe-blue sm:text-base">{testimonial.course}</p>
              <div className="mt-1">
                <Stars count={testimonial.rating} className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="relative">
            <Quote className="absolute -left-2 -top-2 h-8 w-8 text-cafe-coral/20" />
            <p className="pl-6 text-base leading-relaxed text-cafe-ink sm:text-lg">"{testimonial.text}"</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TestimonialCard({ testimonial, onReadMore }: { testimonial: Testimonial; onReadMore: () => void }) {
  const { truncated, isTruncated } = truncateText(testimonial.text, MAX_TEXT_LENGTH);

  return (
    <div className="relative flex h-full flex-col rounded-2xl border border-cafe-sand/70 bg-white p-5 shadow-card sm:p-6 lg:p-8">
      <div className="absolute -left-3 -top-3 rounded-full bg-cafe-coral p-2 sm:-left-4 sm:-top-4 sm:p-3">
        <Quote className="h-4 w-4 text-white sm:h-6 sm:w-6" />
      </div>

      <div className="mb-3 mt-1 sm:mb-4 sm:mt-2">
        <Stars count={testimonial.rating} className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>

      <div className="flex-grow">
        <p className="mb-4 text-sm italic leading-relaxed text-cafe-ink sm:text-base">"{truncated}"</p>
        {isTruncated && (
          <button
            onClick={onReadMore}
            className="text-sm font-medium text-cafe-blue underline underline-offset-2 transition-colors hover:text-cafe-navy"
          >
            Ler mais
          </button>
        )}
      </div>

      <div className="mt-4 flex items-center gap-3 border-t border-cafe-sand/70 pt-4 sm:gap-4">
        <Avatar testimonial={testimonial} size="sm" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-cafe-navy sm:text-base">{testimonial.name}</p>
          <p className="truncate text-xs text-cafe-blue sm:text-sm">{testimonial.course}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [resetTimer, setResetTimer] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = testimonials.length - itemsPerView;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setResetTimer((prev) => prev + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setResetTimer((prev) => prev + 1);
  };

  useEffect(() => {
    if (selectedTestimonial) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxIndex, resetTimer, selectedTestimonial]);

  return (
    <>
      <section id="testimonials" className="overflow-hidden bg-gradient-to-b from-cafe-cream to-white py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={stagger(0.1)}
            className="mb-10 text-center sm:mb-16"
          >
            <motion.h2 variants={fadeUp} className="font-bold mb-3 text-3xl text-cafe-navy sm:mb-4 sm:text-4xl lg:text-5xl">
              O que nossos alunos dizem
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-base text-cafe-ink sm:text-lg lg:text-xl">
              A transformação de quem decidiu investir no próprio aprendizado
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT_ITEM}
            variants={stagger(0)}
            className="mx-auto max-w-6xl"
          >
            <div className="relative">
              <motion.button
                variants={fadeIn}
                custom={0.25}
                onClick={prevSlide}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                style={{ y: '-50%' }}
                className="absolute -left-2 top-1/2 z-10 rounded-full bg-white p-2 text-cafe-navy shadow-lg sm:-left-4 sm:p-3 lg:-left-12"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </motion.button>

              <motion.button
                variants={fadeIn}
                custom={0.25}
                onClick={nextSlide}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                style={{ y: '-50%' }}
                className="absolute -right-2 top-1/2 z-10 rounded-full bg-white p-2 text-cafe-navy shadow-lg sm:-right-4 sm:p-3 lg:-right-12"
                aria-label="Próximo"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </motion.button>

              {/* The viewport reaches into the side gutters so neighbouring cards peek in and fade out. */}
              <div
                className="-mx-4 overflow-hidden px-8 py-6 [--fade:2rem] sm:-mx-6 sm:px-12 sm:[--fade:3rem] lg:-mx-20 lg:px-20 lg:[--fade:5rem]"
                style={{ maskImage: carouselMask, WebkitMaskImage: carouselMask }}
              >
                <div
                  className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={testimonial.name}
                      className="flex-shrink-0 px-2 sm:px-3"
                      style={{ width: `${100 / itemsPerView}%` }}
                    >
                      {/* Stagger from the first card currently on screen, not from the start of the list. */}
                      <motion.div
                        variants={fadeUp}
                        custom={Math.max(0, index - currentIndex) * 0.12}
                        className="h-full"
                      >
                        <TestimonialCard
                          testimonial={testimonial}
                          onReadMore={() => setSelectedTestimonial(testimonial)}
                        />
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              variants={fadeIn}
              custom={0.35}
              className="mt-6 flex justify-center gap-1.5 sm:mt-8 sm:gap-2"
            >
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setResetTimer((prev) => prev + 1);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 sm:h-3 ${
                    currentIndex === index ? 'w-6 bg-cafe-coral sm:w-8' : 'w-2 bg-cafe-sand hover:bg-cafe-ink/40 sm:w-3'
                  }`}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedTestimonial && (
          <TestimonialModal testimonial={selectedTestimonial} onClose={() => setSelectedTestimonial(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
