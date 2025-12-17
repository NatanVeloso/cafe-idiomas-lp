import { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Maria Silva',
    course: 'Inglês Avançado',
    text: 'Em apenas 6 meses consegui a promoção que tanto queria! O foco em conversação me deu a confiança que faltava para participar de reuniões internacionais.',
    rating: 5
  },
  {
    name: 'João Santos',
    course: 'Francês Intermediário',
    text: 'A flexibilidade de estudar de qualquer lugar foi essencial para encaixar as aulas na minha rotina. Professores incríveis e metodologia que realmente funciona!',
    rating: 5
  },
  {
    name: 'Ana Paula Costa',
    course: 'Inglês Básico',
    text: 'Sempre tive medo de falar inglês. As aulas dinâmicas e o ambiente acolhedor do Café Idiomas me ajudaram a superar essa barreira. Hoje me comunico com segurança!',
    rating: 5
  },
  {
    name: 'Carlos Eduardo',
    course: 'Inglês Intermediário',
    text: 'O acesso às aulas gravadas foi um diferencial enorme. Posso revisar o conteúdo quantas vezes precisar. Minha evolução foi muito mais rápida do que eu esperava!',
    rating: 5
  },
  {
    name: 'Fernanda Oliveira',
    course: 'Francês Básico',
    text: 'Sempre sonhei em aprender francês e finalmente realizei! A plataforma é super intuitiva e o material exclusivo faz toda a diferença no aprendizado.',
    rating: 5
  },
  {
    name: 'Ricardo Mendes',
    course: 'Inglês + Francês',
    text: 'Fazer os dois idiomas ao mesmo tempo parecia impossível, mas a metodologia do Café Idiomas tornou tudo mais fácil. Recomendo demais!',
    rating: 5
  },
  {
    name: 'Juliana Ferreira',
    course: 'Inglês Avançado',
    text: 'O relatório semestral de evolução me mostrou exatamente onde eu precisava melhorar. Hoje trabalho em uma multinacional graças ao meu inglês fluente!',
    rating: 5
  },
  {
    name: 'Pedro Almeida',
    course: 'Francês Avançado',
    text: 'As aulas particulares fizeram toda a diferença no meu aprendizado. O professor adapta o conteúdo às minhas necessidades. Estou pronto para morar na França!',
    rating: 5
  }
];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative h-full">
      <div className="absolute -top-4 -left-4 bg-[#ee6b52] rounded-full p-3">
        <Quote className="w-6 h-6 text-white" />
      </div>

      <div className="flex mb-4 mt-2">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-[#ee6b52] text-[#ee6b52]" />
        ))}
      </div>

      <p className="text-[#515859] mb-6 leading-relaxed italic">
        "{testimonial.text}"
      </p>

      <div className="border-t pt-4 flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-[#00415d] to-[#ee6b52] rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">
            {testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </span>
        </div>
        <div>
          <p className="font-semibold text-[#00415d]">{testimonial.name}</p>
          <p className="text-sm text-[#09598f]">{testimonial.course}</p>
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


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
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
    <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className={`text-4xl lg:text-5xl font-bold text-[#00415d] mb-4 transition-all duration-700 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            O que nossos alunos dizem
          </h2>
          <p
            ref={subtitleRef}
            className={`text-xl text-[#515859] max-w-2xl mx-auto transition-all duration-700 delay-150 ${subtitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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
              className="absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-[#00415d] p-3 rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-[#00415d] p-3 rounded-full shadow-lg transition-all hover:scale-110"
              aria-label="Próximo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Carousel Container */}
            <div className="overflow-hidden px-2 py-6">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 px-3"
                    style={{ width: `${100 / itemsPerView}%` }}
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setResetTimer((prev) => prev + 1);
                }}
                className={`w-3 h-3 rounded-full transition-all ${currentIndex === index
                  ? 'bg-[#ee6b52] w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}