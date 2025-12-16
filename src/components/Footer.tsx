import logo from '../assets/logoWhite.png';
import { Instagram, Youtube, Music2 } from 'lucide-react';
import { useScrollToSection } from '../hooks/useScrollToSection';

export default function Footer() {

  const { scrollToSection } = useScrollToSection();

  return (
    <footer className="bg-gradient-to-br from-[#00415d] to-[#09598f] text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="col-span-2">
            <img
              src={logo}
              alt="Café Idiomas"
              className="h-12 mb-4"
            />
            <p className="text-blue-100 leading-relaxed mb-4">
              Transformando vidas através do ensino de idiomas com qualidade, flexibilidade e paixão.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/escola.cafe.idiomas/" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@escola.cafe.idiomas" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all">
                <Music2 className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@CafeIdiomas" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Links Rápidos</h3>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-blue-100">
              <li><a href="#benefits" onClick={(e) => scrollToSection(e, '#benefits')} className="hover:text-[#ee6b52] transition-colors">Benefícios</a></li>
              <li><a href="#courses" onClick={(e) => scrollToSection(e, '#courses')} className="hover:text-[#ee6b52] transition-colors">Cursos</a></li>
              <li><a href="#about" onClick={(e) => scrollToSection(e, '#about')} className="hover:text-[#ee6b52] transition-colors">Sobre Nós</a></li>
              <li><a href="#faq" onClick={(e) => scrollToSection(e, '#faq')} className="hover:text-[#ee6b52] transition-colors">FAQ</a></li>
              <li><a href="#testimonials" onClick={(e) => scrollToSection(e, '#testimonials')} className="hover:text-[#ee6b52] transition-colors">Depoimentos</a></li>
              <li><a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="hover:text-[#ee6b52] transition-colors">Contato</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-blue-100">
          <p>&copy; {new Date().getFullYear()} Café Idiomas. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}