import { Globe, MessageCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#186595] to-[#0d4a6b] text-white">
      <div className="container mx-auto px-6 py-20 lg:py-32 pt-24 lg:pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Aprenda Inglês e Francês com Naturalidade
            </h1>
            <p className="text-xl mb-8 text-blue-100 leading-relaxed">
              Destrave seu potencial linguístico com aulas dinâmicas, personalizadas e sem complicação. Sua fluência começa aqui.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 text-center"
              >
                Comece Agora
              </a>
              <a
                href="#about"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold transition-all border-2 border-white/30 text-center"
              >
                Saiba Mais
              </a>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 rounded-3xl transform rotate-6 opacity-20"></div>
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-500 p-4 rounded-full">
                    <Globe className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Inglês & Francês</h3>
                    <p className="text-blue-100">Dois idiomas, infinitas oportunidades</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-500 p-4 rounded-full">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Foco em Conversação</h3>
                    <p className="text-blue-100">Destrave sua fala com confiança</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-0 right-0" style={{bottom: -1}}>
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 80C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
        </svg>
      </div>
    </section>
  );
}
