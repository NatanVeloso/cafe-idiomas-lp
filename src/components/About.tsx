import { Target, Heart, TrendingUp } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const features = [
  {
    icon: Target,
    title: 'Metodologia Que Funciona de Verdade',
    description: 'Resultados reais através de estratégias práticas que realmente fazem diferença',
    color: 'bg-[#ee6b52]'
  },
  {
    icon: Heart,
    title: 'Aprendizado Humanizado',
    description: 'Professores dedicados que entendem suas necessidades e objetivos individuais',
    color: 'bg-[#00415d]'
  },
  {
    icon: TrendingUp,
    title: 'Foco em Resultados',
    description: 'Aprender uma língua estrangeira deixa de ser um sonho distante e vira parte da sua vida',
    color: 'bg-[#ee6b52]'
  }
];

function FeatureItem({ feature, index }: { feature: typeof features[0]; index: number }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`flex items-start space-x-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
        }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className={`${feature.color} p-3 rounded-lg flex-shrink-0`}>
        <feature.icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="font-semibold text-lg text-[#00415d] mb-1">{feature.title}</h3>
        <p className="text-[#515859]">{feature.description}</p>
      </div>
    </div>
  );
}

function CardItem({ children, index }: { children: React.ReactNode; index: number }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {children}
    </div>
  );
}

export default function About() {
  const { ref: titleRef, isInView: titleInView } = useInView({ threshold: 0.1 });
  const { ref: text1Ref, isInView: text1InView } = useInView({ threshold: 0.1 });
  const { ref: text2Ref, isInView: text2InView } = useInView({ threshold: 0.1 });
  const { ref: cardTitleRef, isInView: cardTitleInView } = useInView({ threshold: 0.1 });
  const { ref: cardRef, isInView: cardInView } = useInView({ threshold: 0.1 });

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <h2
              ref={titleRef}
              className={`text-4xl lg:text-5xl font-bold text-[#00415d] mb-6 transition-all duration-700 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              Sobre Nós
            </h2>
            <p
              ref={text1Ref}
              className={`text-xl text-[#515859] mb-6 leading-relaxed transition-all duration-700 delay-150 ${text1InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              A Escola Café Idiomas nasceu com uma missão clara: tornar o aprendizado de idiomas simples, eficiente e envolvente.
            </p>
            <p
              ref={text2Ref}
              className={`text-lg text-[#515859] mb-8 leading-relaxed transition-all duration-700 delay-300 ${text2InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              Acreditamos que para aprender um novo idioma não precisa ser um processo tedioso ou complicado. Nossa metodologia combina tecnologia, professores experientes e uma abordagem humanizada que coloca você no centro do processo de aprendizagem. Aqui o foco é você.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <FeatureItem key={index} feature={feature} index={index} />
              ))}
            </div>
          </div>

          <div className="relative">
            <div
              ref={cardRef}
              className={`transition-all duration-700 ${cardInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#00415d] to-[#ee6b52] rounded-3xl transform rotate-3 opacity-10"></div>
              <div className="relative bg-gradient-to-br from-[#00415d] to-[#09598f] rounded-3xl p-8 text-white shadow-2xl">
                <h3
                  ref={cardTitleRef}
                  className={`text-2xl font-bold mb-6 transition-all duration-700 ${cardTitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                  O que nos diferencia?
                </h3>
                <div className="space-y-6">
                  <CardItem index={0}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <p className="text-lg leading-relaxed">
                        Não oferecemos apenas aulas de idiomas, criamos experiências transformadoras que desenvolvem sua confiança e competência comunicativa.
                      </p>
                    </div>
                  </CardItem>
                  <CardItem index={1}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <p className="text-lg leading-relaxed">
                        Nossa abordagem prática e dinâmica garante que você saia de cada aula mais preparado para se comunicar no mundo real.
                      </p>
                    </div>
                  </CardItem>
                  <CardItem index={2}>
                    <div className="bg-[#ee6b52] rounded-xl p-6 shadow-lg">
                      <p className="text-xl font-semibold">
                        Queremos te ajudar a alcançar a fluência sem enrolação!
                      </p>
                    </div>
                  </CardItem>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}