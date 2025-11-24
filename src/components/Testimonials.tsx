import { Quote, Star } from 'lucide-react';

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
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            O que nossos alunos dizem
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Histórias reais de transformação através do aprendizado de idiomas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 relative"
            >
              <div className="absolute -top-4 -left-4 bg-orange-500 rounded-full p-3">
                <Quote className="w-6 h-6 text-white" />
              </div>

              <div className="flex mb-4 mt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />
                ))}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-[#186595]">{testimonial.course}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
