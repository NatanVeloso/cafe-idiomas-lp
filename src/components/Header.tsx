import logo from '../assets/loog com texto.png';

interface HeaderProps {
  isScrolled: boolean;
}

export default function Header({ isScrolled }: HeaderProps) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-blue-500/40 backdrop-blur-2xl shadow-lg'
          : 'bg-transparent'
      }`}
      style={{
        backdropFilter: isScrolled ? 'blur(10px) brightness(1.1)' : 'none',
        background: isScrolled
          ? 'linear-gradient(135deg, rgba(24, 101, 149, 0.9) 0%, rgba(13, 74, 107, 0.8) 100%)'
          : 'transparent',
      }}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <img
            src={logo}
            alt="Café Idiomas"
            className={`transition-all duration-300 ${
              isScrolled ? 'h-10' : 'h-12'
            }`}
          />
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#benefits"
              className={`transition-colors duration-300 ${
                isScrolled ? 'text-white hover:text-orange-300' : 'text-white/80 hover:text-white'
              }`}
            >
              Benefícios
            </a>
            <a
              href="#about"
              className={`transition-colors duration-300 ${
                isScrolled ? 'text-white hover:text-orange-300' : 'text-white/80 hover:text-white'
              }`}
            >
              Sobre Nós
            </a>
            <a
              href="#testimonials"
              className={`transition-colors duration-300 ${
                isScrolled ? 'text-white hover:text-orange-300' : 'text-white/80 hover:text-white'
              }`}
            >
              Depoimentos
            </a>
            <a
              href="#contact"
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                isScrolled
                  ? 'bg-orange-500 hover:bg-orange-600 text-white'
                  : 'bg-white/20 hover:bg-white/30 text-white border border-white/40'
              }`}
            >
              Contato
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
