import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#186595] to-[#0d4a6b] text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <img
              src="/src/assets/loog com texto.png"
              alt="Café Idiomas"
              className="h-12 mb-4"
            />
            <p className="text-blue-100 leading-relaxed mb-4">
              Transformando vidas através do ensino de idiomas com qualidade, flexibilidade e paixão.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-blue-100">
              <li><a href="#benefits" className="hover:text-orange-300 transition-colors">Benefícios</a></li>
              <li><a href="#about" className="hover:text-orange-300 transition-colors">Sobre Nós</a></li>
              <li><a href="#testimonials" className="hover:text-orange-300 transition-colors">Depoimentos</a></li>
              <li><a href="#contact" className="hover:text-orange-300 transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Cursos</h3>
            <ul className="space-y-2 text-blue-100">
              <li><a href="#" className="hover:text-orange-300 transition-colors">Inglês Básico</a></li>
              <li><a href="#" className="hover:text-orange-300 transition-colors">Inglês Intermediário</a></li>
              <li><a href="#" className="hover:text-orange-300 transition-colors">Inglês Avançado</a></li>
              <li><a href="#" className="hover:text-orange-300 transition-colors">Francês</a></li>
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
