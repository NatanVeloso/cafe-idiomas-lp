import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logoComCor.png';
import logoWhite from '../assets/logoWhite.png';
import { useScrollToSection } from '../hooks/useScrollToSection';

interface HeaderProps {
  isScrolled: boolean;
}

const navLinks = [
  { href: '#benefits', label: 'Benefícios' },
  { href: '#about', label: 'Sobre Nós' },
  { href: '#testimonials', label: 'Depoimentos' },
  { href: '#courses', label: 'Cursos' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contato' },
];

export default function Header({ isScrolled }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollToSection } = useScrollToSection();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    scrollToSection(e, href);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
        }`}
    >
      <nav className="container mx-auto px-6 lg:px-20 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <img
  src={isScrolled ? logo : logoWhite}
  alt="Café Idiomas"
  className={`transition-all duration-300 ${isScrolled ? 'h-10' : 'h-12'}`}
/>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`transition-colors duration-300 text-sm font-medium ${isScrolled
                    ? 'text-[#00415d] hover:text-[#ee6b52]'
                    : 'text-white/80 hover:text-white'
                  }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#"
              className={`px-5 py-2 rounded-full transition-all duration-300 text-sm font-semibold ${isScrolled
                  ? 'bg-[#ee6b52] hover:bg-[#ca523c] text-white'
                  : 'bg-white/20 hover:bg-white/30 text-white border border-white/40'
                }`}
            >
              Sou Professor/Aluno
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 ${isScrolled ? 'text-[#00415d]' : 'text-white'}`}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
        >
          <div className={`rounded-2xl p-6 space-y-4 ${isScrolled
              ? 'bg-gray-50'
              : 'bg-[#00415d]/95 backdrop-blur-lg'
            }`}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block transition-colors py-2 text-lg font-medium ${isScrolled
                    ? 'text-[#00415d] hover:text-[#ee6b52]'
                    : 'text-white hover:text-[#ee6b52]'
                  }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#"
              className="block bg-[#ee6b52] hover:bg-[#ca523c] text-white text-center py-3 rounded-full font-semibold transition-all mt-4"
            >
              Sou Professor/Aluno
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}