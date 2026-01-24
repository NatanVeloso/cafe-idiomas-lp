import { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { Quote, Star, ChevronLeft, ChevronRight, X } from 'lucide-react';

import kaike from '../assets/Kaike.png';
import Heila from '../assets/Heila.jpg';
import Elisa from '../assets/Elisa.png';
import Luiza from '../assets/Luiza.png';
import Rejane from '../assets/Rejane.png';
import Daniel from '../assets/Daniel.png';
import Nathaly from '../assets/Nathaly.png';

const testimonials = [
  {
    name: 'Kaique Santos',
    course: 'Inglês Iniciante',
    text: 'Foi a melhor escola de idiomas que eu frequentei. O melhor de tudo é que eu nem preciso sair de casa, pegar trânsito. Muito prático!',
    rating: 5,
    img: kaike
  },
  {
    name: 'Heila Carolina',
    course: 'Francês Básico',
    text: 'Gostaria de registrar meu sincero agradecimento à escola Café Idiomas e, em especial, à professora Thaís. Sua paciência, cordialidade e dedicação fazem toda a diferença no processo de aprendizado. Destaco também o método de aprendizado lúdico adotado pela escola, que torna as aulas mais dinâmicas, prazerosas e eficazes, além do formato de aula individual, que realmente faz toda a diferença no desenvolvimento do aluno. Não posso deixar de elogiar a secretária Bia, sempre muito atenciosa, prestativa e eficiente, contribuindo para que toda a experiência com a escola seja ainda mais positiva. Parabéns a toda a equipe pelo excelente trabalho!',
    rating: 5,
    img: Heila
  },
  {
    name: 'Elisa Griebeller',
    course: 'Inglês Avançado + Francês Iniciante',
    text: 'A metodologia é muito divertida e eficiente, o que resulta em um aprendizado rápido e eficaz. Já avancei no curso de inglês e iniciei o francês conjuntamente. Recomendo ambos os cursos e professores que são maravilhosos.',
    rating: 5,
    img: Elisa
  },
  {
    name: 'Rejane Dias',
    course: 'Inglês Intermediário',
    text: 'As aulas na Café com Idiomas fizeram toda a diferença na aprovação do meu mestrado, especialmente porque a primeira fase exigia prova de proficiência. Durante as aulas, recebi orientações fundamentais sobre como traduzir textos, identificar palavras-chave e responder às questões com mais segurança e precisão. Sem a ajuda da professora e do suporte da escola, teria sido muito difícil alcançar uma nota tão relevante. Só tenho a agradecer pela simpatia, profissionalismo e excelente didática de toda a equipe. Parabéns pelo trabalho e muito sucesso sempre!',
    rating: 5,
    img: Rejane
  },
  {
    name: 'Daniel Fenris',
    course: 'Pai de aluna Inglês Avançado',
    text: 'Minha esposa e filha são alunas da Café Idiomas e isso mudou nossa família. Mudou não só o lazer, como compreender séries e filmes, além das interações em casa também ampliou os objetivos de vida. Minha esposa agora busca uma certificação internacional em contabilidade e minha filha fará processo seletivo para universidades nos EUA. Meu caçula anseia atingir a idade para iniciar as aulas e passar a entender os jogos de computador, que faço questão de deixar tudo em inglês.',
    rating: 5,
    img: Daniel
  },
  {
    name: 'Luiza Fariello',
    course: 'Ex-aluna de Inglês',
    text: 'O que eu mais gostei na Café Idiomas foi a personalização do atendimento, as aulas atenderam exatamente aquilo que eu precisava, conversação em nível avançado. O professor foi muito atencioso, adaptando a aula quando preciso, sempre de forma criativa para não ficar monótono, e em seis meses eu já estava muito mais fluente e segura. Além disso, o diploma foi essencial para que eu ingressasse no doutorado.',
    rating: 5,
    img: Luiza
  },
  {
    name: 'Beatriz Fariello',
    course: 'Inglês Intermediário',
    text: 'Adoro estudar inglês na Café idiomas, melhorei bastante minha conversação e entendimento da língua no último ano. Minha parte favorita das aulas são os filmes que assistimos ao longo dos capítulos, além de serem muito divertidos, as histórias me fazem prestar mais atenção na matéria e ver o que estamos estudando sendo usado na prática.',
    rating: 5
  },
  {
    name: 'Nathaly Rodrigues',
    course: 'Ex-aluna Inglês',
    text: 'Ao longo da minha vida, desde criança, eu passei por inúmeras escolas de idiomas e nunca havia conseguido dar continuidade nos cursos, por não entender a forma como era explicado, nem fixar o conteúdo. Achava que era porque eu não tinha habilidades de retenção do aprendizado desse idioma, até que me apaixonei por missões transculturais (cristã) e queria muito usar o idioma para expandir minha missão, também tinha o desejo de fazer um intercâmbio algum dia. Foi assim que conheci a Café Idiomas [...] e me encantei pelo método de estudo, era personalizado, didático, com a prática na conversação que era o meu foco [...]. Consegui fazer meu intercâmbio para o Canadá em 2019, a experiência em cursar a Café Idiomas tornou minha adaptação muito mais simples, [...] e o inglês aprendido nesse tempo foi fundamental para eu conseguir me comunicar com as pessoas e entender o que elas falavam. Nessa época meus filhos eram bem pequenos, mas já plantava neles o interesse pelo inglês, quando então completaram a idade pra cursar (2024) não existia outra escola que eu pensaria em matriculá-los senão a Café Idiomas, eles iniciaram Inglês e Francês de forma individualizada e avançaram no idioma em pouco tempo [...]. Sem dúvidas a Café Idiomas tem como seu diferencial: a educação individualizada e humanizada e adicionam muito com a didática específica que prendem a atenção do aluno, o que é muito diferente das escolas convencionais. Foi e tem sido uma bênção para nossa família.',
    rating: 5,
    img: Nathaly
  }
];

const MAX_TEXT_LENGTH = 150;

function truncateText(text: string, maxLength: number): { truncated: string; isTruncated: boolean } {
  if (text.length <= maxLength) {
    return { truncated: text, isTruncated: false };
  }
  return { truncated: text.slice(0, maxLength).trim() + '...', isTruncated: true };
}

interface TestimonialModalProps {
  testimonial: typeof testimonials[0];
  onClose: () => void;
}

function TestimonialModal({ testimonial, onClose }: TestimonialModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-6">
            {testimonial.img ? (
              <img
                src={testimonial.img}
                alt={testimonial.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-[#ee6b52]/20"
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#00415d] to-[#ee6b52] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg sm:text-xl">
                  {testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h3 className="font-bold text-lg sm:text-xl text-[#00415d]">{testimonial.name}</h3>
              <p className="text-sm sm:text-base text-[#09598f]">{testimonial.course}</p>
              <div className="flex mt-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#ee6b52] text-[#ee6b52]" />
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <Quote className="w-8 h-8 text-[#ee6b52]/20 absolute -top-2 -left-2" />
            <p className="text-[#515859] leading-relaxed text-base sm:text-lg pl-6">
              "{testimonial.text}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TestimonialCardProps {
  testimonial: typeof testimonials[0];
  onReadMore: () => void;
}

function TestimonialCard({ testimonial, onReadMore }: TestimonialCardProps) {
  const { truncated, isTruncated } = truncateText(testimonial.text, MAX_TEXT_LENGTH);

  return (
    <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-2xl shadow-lg border border-gray-100 relative h-full flex flex-col">
      <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 bg-[#ee6b52] rounded-full p-2 sm:p-3">
        <Quote className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
      </div>

      <div className="flex mb-3 sm:mb-4 mt-1 sm:mt-2">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#ee6b52] text-[#ee6b52]" />
        ))}
      </div>

      <div className="flex-grow">
        <p className="text-[#515859] mb-4 leading-relaxed italic text-sm sm:text-base">
          "{truncated}"
        </p>
        {isTruncated && (
          <button
            onClick={onReadMore}
            className="text-[#09598f] hover:text-[#00415d] font-medium text-sm transition-colors underline underline-offset-2"
          >
            Ler mais
          </button>
        )}
      </div>

      <div className="border-t pt-4 flex items-center gap-3 sm:gap-4 mt-4">
        {testimonial.img ? (
          <img
            src={testimonial.img}
            alt={testimonial.name}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-[#ee6b52]/20 flex-shrink-0"
          />
        ) : (
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#00415d] to-[#ee6b52] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xs sm:text-sm">
              {testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          </div>
        )}
        <div className="min-w-0">
          <p className="font-semibold text-[#00415d] text-sm sm:text-base truncate">{testimonial.name}</p>
          <p className="text-xs sm:text-sm text-[#09598f] truncate">{testimonial.course}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { ref: titleRef, isInView: titleInView } = useInView({ threshold: 0.1 });
  const { ref: subtitleRef, isInView: subtitleInView } = useInView({ threshold: 0.1 });
  const { ref: carouselRef, isInView: carouselInView } = useInView({ threshold: 0.1 });

  const [resetTimer, setResetTimer] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [selectedTestimonial, setSelectedTestimonial] = useState<typeof testimonials[0] | null>(null);

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
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [maxIndex, resetTimer]);

  return (
    <>
      <section id="testimonials" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2
              ref={titleRef}
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[#00415d] mb-3 sm:mb-4 transition-all duration-700 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              O que nossos alunos dizem
            </h2>
            <p
              ref={subtitleRef}
              className={`text-base sm:text-lg lg:text-xl text-[#515859] max-w-2xl mx-auto transition-all duration-700 delay-150 ${subtitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              A transformação de quem decidiu investir no próprio aprendizado
            </p>
          </div>

          <div
            ref={carouselRef}
            className={`max-w-6xl mx-auto transition-all duration-700 ${carouselInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <div className="relative">
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute -left-2 sm:-left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-[#00415d] p-2 sm:p-3 rounded-full shadow-lg transition-all hover:scale-110"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute -right-2 sm:-right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-[#00415d] p-2 sm:p-3 rounded-full shadow-lg transition-all hover:scale-110"
                aria-label="Próximo"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Carousel Container */}
              <div className="overflow-hidden px-6 sm:px-4 py-6">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                  }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 px-2 sm:px-3"
                      style={{ width: `${100 / itemsPerView}%` }}
                    >
                      <TestimonialCard
                        testimonial={testimonial}
                        onReadMore={() => setSelectedTestimonial(testimonial)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setResetTimer((prev) => prev + 1);
                  }}
                  className={`h-2 sm:h-3 rounded-full transition-all ${currentIndex === index
                    ? 'bg-[#ee6b52] w-6 sm:w-8'
                    : 'bg-gray-300 hover:bg-gray-400 w-2 sm:w-3'
                    }`}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedTestimonial && (
        <TestimonialModal
          testimonial={selectedTestimonial}
          onClose={() => setSelectedTestimonial(null)}
        />
      )}

      {/* Animation styles */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
}