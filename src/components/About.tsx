import { Target, Heart, TrendingUp } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Sobre Nós
            </h2>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              O Café Idiomas nasceu com uma missão clara: democratizar o acesso ao ensino de idiomas de alta qualidade, tornando o aprendizado acessível, eficiente e verdadeiramente envolvente.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Acreditamos que aprender um novo idioma não precisa ser um processo tedioso ou caro. Nossa metodologia combina tecnologia de ponta, professores experientes e uma abordagem humanizada que coloca você no centro do processo de aprendizagem.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-orange-500 p-3 rounded-lg flex-shrink-0">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">Metodologia Comprovada</h3>
                  <p className="text-gray-600">Resultados reais através de técnicas validadas e personalizadas para seu ritmo</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#186595] p-3 rounded-lg flex-shrink-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">Aprendizado Humanizado</h3>
                  <p className="text-gray-600">Professores dedicados que entendem suas necessidades e objetivos individuais</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-500 p-3 rounded-lg flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">Foco em Resultados</h3>
                  <p className="text-gray-600">Fluência real sem enrolação - acompanhe seu progresso a cada aula</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#186595] to-orange-500 rounded-3xl transform rotate-3 opacity-10"></div>
            <div className="relative bg-gradient-to-br from-[#186595] to-[#0d4a6b] rounded-3xl p-8 text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-6">O que nos diferencia?</h3>
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <p className="text-lg leading-relaxed">
                    Não oferecemos apenas aulas de idiomas - criamos experiências transformadoras que desenvolvem sua confiança e competência comunicativa.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <p className="text-lg leading-relaxed">
                    Nossa abordagem prática e dinâmica garante que você saia de cada aula mais preparado para se comunicar no mundo real.
                  </p>
                </div>
                <div className="bg-orange-500 rounded-xl p-6 shadow-lg">
                  <p className="text-xl font-semibold">
                    Queremos te ajudar a alcançar a fluência sem enrolação!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
