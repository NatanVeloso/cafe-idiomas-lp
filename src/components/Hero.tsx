import { useInView } from '../hooks/useInView';
import { Globe, MessageCircle, Sparkles } from 'lucide-react';
import { useScrollToSection } from '../hooks/useScrollToSection';

export default function Hero() {
  const phoneNumber = '553499690446';
  const message = 'Olá! Vim pelo site Café Idiomas e gostaria de agendar uma aula demonstrativa.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const { ref: titleRef, isInView: titleInView } = useInView({ threshold: 0.1 });
  const { ref: subtitleRef, isInView: subtitleInView } = useInView({ threshold: 0.1 });
  const { ref: buttonsRef, isInView: buttonsInView } = useInView({ threshold: 0.1 });
  const { ref: cardRef, isInView: cardInView } = useInView({ threshold: 0.1 });
  const { ref: item1Ref, isInView: item1InView } = useInView({ threshold: 0.1 });
  const { ref: item2Ref, isInView: item2InView } = useInView({ threshold: 0.1 });
  const { ref: item3Ref, isInView: item3InView } = useInView({ threshold: 0.1 });

  
  const { scrollToSection } = useScrollToSection();
  

  const cardItems = [
    { icon: Globe, title: 'Inglês e Francês', desc: 'Dois idiomas, infinitas oportunidades', ref: item1Ref, isInView: item1InView },
    { icon: MessageCircle, title: 'Foco em Conversação', desc: 'Destrave sua fala com confiança', ref: item2Ref, isInView: item2InView },
    { icon: Sparkles, title: 'Aulas Personalizadas', desc: 'Conteúdo adaptado aos seus objetivos', ref: item3Ref, isInView: item3InView }
  ];

  return (
<section className="relative bg-gradient-to-br from-[#00415d] to-[#09598f] text-white px-6 lg:px-20 xl:px-32">
      <div className="container mx-auto px-6 py-20 lg:py-32 pt-24 lg:pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1
              ref={titleRef}
              className={`text-5xl lg:text-6xl font-bold mb-6 leading-tight transition-all duration-700 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              Aprenda Inglês e Francês com Naturalidade e Segurança
            </h1>
            <p
              ref={subtitleRef}
              className={`text-xl mb-8 text-blue-100 leading-relaxed transition-all duration-700 delay-150 ${subtitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              Aulas particulares e ao vivo. Aprenda no seu ritmo e fale com confiança. Sua fluência começa aqui!
            </p>
            <div
              ref={buttonsRef}
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${buttonsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#ee6b52] hover:bg-[#ca523c] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 text-center"
              >
                Agendar aula demonstrativa
              </a>
              <a
                href="#about" onClick={(e) => scrollToSection(e, '#about')}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold transition-all border-2 border-white/30 text-center"
              >
                Saiba Mais
              </a>
            </div>
          </div>

          <div className="relative hidden lg:block pl-20">
            <div
              ref={cardRef}
              className={`transition-all duration-700 ${cardInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#ee6b52] to-[#ca523c] rounded-3xl transform rotate-6 opacity-20 ml-20"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="space-y-6">
                  {cardItems.map((item, index) => (
                    <div
                      key={index}
                      ref={item.ref}
                      className={`flex items-center space-x-4 transition-all duration-500 ${item.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                        }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="bg-[#ee6b52] p-4 rounded-full">
                        <item.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <p className="text-blue-100">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-0 right-0" style={{ bottom: -1 }}>
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 80C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB" />
        </svg>
      </div>
    </section>
  );
}