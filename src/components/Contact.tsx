import { Mail, Phone, Instagram, Music2, Send } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const contactItems = [
  {
    icon: Phone,
    title: 'Telefone',
    content: '+55 (34) 9969-0446',
    color: 'bg-[#00415d]'
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'cafeidiomass@gmail.com',
    color: 'bg-[#ee6b52]'
  },
  {
    icon: Instagram,
    title: 'Instagram',
    content: '@escola.cafe.idiomas',
    link: 'https://instagram.com/escola.cafe.idiomas',
    color: 'bg-[#00415d]'
  },
  {
    icon: Music2,
    title: 'TikTok',
    content: '@escola.cafe.idiomas',
    link: 'https://tiktok.com/@escola.cafe.idiomas',
    color: 'bg-[#ee6b52]'
  }
];

function ContactItem({ item, index }: { item: typeof contactItems[0]; index: number }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const Icon = item.icon;

  return (
    <div
      ref={ref}
      className={`flex items-start space-x-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
        }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`${item.color} p-3 rounded-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h4 className="font-semibold text-[#00415d] mb-1">{item.title}</h4>
        {item.link ? (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#515859] hover:text-[#ee6b52] transition-colors"
          >
            {item.content}
          </a>
        ) : (
          <p className="text-[#515859]">{item.content}</p>
        )}
      </div>
    </div>
  );
}

function FormField({ children, index }: { children: React.ReactNode; index: number }) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {children}
    </div>
  );
}

export default function Contact() {
  const { ref: titleRef, isInView: titleInView } = useInView({ threshold: 0.1 });
  const { ref: subtitleRef, isInView: subtitleInView } = useInView({ threshold: 0.1 });
  const { ref: contactTitleRef, isInView: contactTitleInView } = useInView({ threshold: 0.1 });
  const { ref: scheduleRef, isInView: scheduleInView } = useInView({ threshold: 0.1 });
  const { ref: formRef, isInView: formInView } = useInView({ threshold: 0.1 });

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              ref={titleRef}
              className={`text-4xl lg:text-5xl font-bold text-[#00415d] mb-4 transition-all duration-700 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              Entre em Contato
            </h2>
            <p
              ref={subtitleRef}
              className={`text-xl text-[#515859] max-w-3xl mx-auto transition-all duration-700 delay-150 ${subtitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              Pronto para começar a sua jornada rumo à fluência? Fale com a nossa equipe
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3
                ref={contactTitleRef}
                className={`text-2xl font-bold text-[#00415d] mb-6 transition-all duration-700 ${contactTitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
              >
                Fale Conosco
              </h3>

              <div className="space-y-6 mb-8">
                {contactItems.map((item, index) => (
                  <ContactItem key={index} item={item} index={index} />
                ))}
              </div>

              <div
                ref={scheduleRef}
                className={`bg-gradient-to-br from-[#00415d] to-[#09598f] rounded-2xl p-8 text-white transition-all duration-700 ${scheduleInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
              >
                <h4 className="text-xl font-bold mb-4">Horário de Atendimento</h4>
                <div className="space-y-2 text-blue-100">
                  <p>Segunda a Sexta: 7h às 20h</p>
                  <p>Sábado: 8h às 12h</p>
                  <p>Domingo: Fechado</p>
                </div>
              </div>
            </div>

            <div
              ref={formRef}
              className={`bg-gray-50 rounded-2xl p-8 transition-all duration-700 ${formInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
            >
              <form className="space-y-6">
                <FormField index={0}>
                  <label htmlFor="name" className="block text-sm font-semibold text-[#00415d] mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00415d] focus:border-transparent outline-none transition-all"
                    placeholder="Seu nome"
                  />
                </FormField>

                <FormField index={1}>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#00415d] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00415d] focus:border-transparent outline-none transition-all"
                    placeholder="seu@email.com"
                  />
                </FormField>

                <FormField index={2}>
                  <label htmlFor="phone" className="block text-sm font-semibold text-[#00415d] mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00415d] focus:border-transparent outline-none transition-all"
                    placeholder="(34) 99999-9999"
                  />
                </FormField>

                <FormField index={3}>
                  <label htmlFor="course" className="block text-sm font-semibold text-[#00415d] mb-2">
                    Idioma de Interesse
                  </label>
                  <select
                    id="course"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00415d] focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Selecione um idioma</option>
                    <option value="ingles">Inglês</option>
                    <option value="frances">Francês</option>
                    <option value="ambos">Ambos</option>
                  </select>
                </FormField>

                <FormField index={4}>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#00415d] mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00415d] focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Conte-nos um pouco sobre seus objetivos..."
                  ></textarea>
                </FormField>

                <FormField index={5}>
                  <button
                    type="submit"
                    className="w-full bg-[#ee6b52] hover:bg-[#ca523c] text-white font-semibold py-4 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <span>Enviar Mensagem</span>
                    <Send className="w-5 h-5" />
                  </button>
                </FormField>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}