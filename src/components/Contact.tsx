import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Loader2, Mail, Phone, Instagram, Music2, Send } from 'lucide-react';
import { fadeUp, revealItem, scaleIn, slideInLeft, slideInRight, stagger, VIEWPORT } from '../motion/presets';
import { PRIVACY_URL } from '../legal';

const contactItems = [
  {
    icon: Instagram,
    title: 'Instagram',
    content: '@escola.cafe.idiomas',
    link: 'https://instagram.com/escola.cafe.idiomas',
    color: 'bg-cafe-navy',
  },
  {
    icon: Music2,
    title: 'TikTok',
    content: '@escola.cafe.idiomas',
    link: 'https://tiktok.com/@escola.cafe.idiomas',
    color: 'bg-cafe-coral',
  },
  {
    icon: Phone,
    title: 'Telefone',
    content: '+55 (34) 9969-0446',
    color: 'bg-cafe-navy',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'cafeidiomass@gmail.com',
    color: 'bg-cafe-coral',
  },
];

const inputClass =
  'w-full rounded-xl border border-cafe-sand bg-white px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-cafe-navy';

/** API da escola (portal). Em dev, aponte VITE_API_URL para o backend local. */
const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? 'https://api.escolacafeidiomas.com.br';

const WHATSAPP_URL = `https://wa.me/553499690446?text=${encodeURIComponent(
  'Olá! Vim pelo site Café Idiomas e gostaria de saber mais sobre os cursos.',
)}`;

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus('sending');
    try {
      const res = await fetch(`${API_URL}/public/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        form.reset();
        setStatus('sent');
        return;
      }

      setErrorMessage(
        res.status === 429
          ? 'Você já enviou algumas mensagens agora há pouco. Tente de novo em alguns minutos ou'
          : res.status === 400
            ? 'Confira se nome, e-mail e telefone estão preenchidos corretamente. Se preferir,'
            : 'Não conseguimos enviar sua mensagem agora. Tente novamente ou',
      );
      setStatus('error');
    } catch {
      setErrorMessage('Sem conexão com o servidor. Tente novamente ou');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="overflow-x-hidden bg-white py-20 lg:py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={stagger(0.1)}
            className="mb-14 text-center lg:mb-16"
          >
            <motion.h2 variants={fadeUp} className="font-bold mb-4 text-4xl text-cafe-navy lg:text-5xl">
              Entre em Contato
            </motion.h2>
            <motion.p variants={fadeUp} className="mx-auto max-w-3xl text-lg text-cafe-ink lg:text-xl">
              Pronto para começar a sua jornada rumo à fluência? Fale com a nossa equipe
            </motion.p>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <motion.h3 variants={fadeUp} {...revealItem()} className="mb-6 text-2xl font-bold text-cafe-navy">
                Fale Conosco
              </motion.h3>

              <div className="mb-8 space-y-6">
                {contactItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    variants={slideInLeft}
                    {...revealItem(index * 0.1)}
                    className="flex items-start gap-4"
                  >
                    <div className={`${item.color} rounded-lg p-3`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-cafe-navy">{item.title}</h4>
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cafe-ink transition-colors hover:text-cafe-coral"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-cafe-ink">{item.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={scaleIn}
                {...revealItem()}
                className="rounded-2xl bg-gradient-to-br from-cafe-navy to-cafe-blue p-8 text-white"
              >
                <h4 className="mb-4 text-xl font-bold">Horário de Atendimento</h4>
                <div className="space-y-2 text-cafe-cream/80">
                  <p>Segunda a Sexta: 7h às 20h</p>
                  <p>Sábado: 8h às 12h</p>
                  <p>Domingo: Fechado</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              variants={slideInRight}
              {...revealItem(0.1)}
              className="rounded-2xl border border-cafe-sand/70 bg-cafe-cream p-8"
            >
              {status === 'sent' ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center" role="status">
                  <CheckCircle2 className="mb-4 h-14 w-14 text-cafe-coral" />
                  <h4 className="mb-2 text-2xl font-bold text-cafe-navy">Mensagem enviada!</h4>
                  <p className="max-w-sm text-cafe-ink">
                    Obrigado pelo contato. Nossa equipe vai responder em breve no e-mail ou telefone que você informou.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm font-semibold text-cafe-blue underline underline-offset-2 hover:text-cafe-navy"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form className="relative space-y-6" onSubmit={handleSubmit}>
                  {/* Honeypot anti-spam: invisível para pessoas, bots costumam preencher. */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <label htmlFor="website">Não preencha este campo</label>
                    <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-semibold text-cafe-navy">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      maxLength={120}
                      autoComplete="name"
                      className={inputClass}
                      placeholder="Seu nome"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-cafe-navy">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      maxLength={160}
                      autoComplete="email"
                      className={inputClass}
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-cafe-navy">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      maxLength={40}
                      autoComplete="tel"
                      className={inputClass}
                      placeholder="(34) 99999-9999"
                    />
                  </div>

                  <div>
                    <label htmlFor="course" className="mb-2 block text-sm font-semibold text-cafe-navy">
                      Idioma de Interesse
                    </label>
                    <select id="course" name="language" className={inputClass}>
                      <option value="">Selecione um idioma</option>
                      <option value="ingles">Inglês</option>
                      <option value="frances">Francês</option>
                      <option value="ambos">Ambos</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="level" className="mb-2 block text-sm font-semibold text-cafe-navy">
                      Seu Nível Atual
                    </label>
                    <select id="level" name="level" className={inputClass}>
                      <option value="">Selecione seu nível</option>
                      <option value="iniciante">Iniciante (nunca estudei)</option>
                      <option value="basico">Básico (entendo pouco)</option>
                      <option value="intermediario">Intermediário (consigo me comunicar)</option>
                      <option value="avancado">Avançado (quero aperfeiçoar)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-semibold text-cafe-navy">
                      Objetivo
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      maxLength={2000}
                      className={`${inputClass} resize-none`}
                      placeholder="Conte-nos um pouco sobre seus objetivos..."
                    ></textarea>
                  </div>

                  {status === 'error' && (
                    <p role="alert" className="rounded-xl bg-cafe-coral/10 px-4 py-3 text-sm text-cafe-coral-dark">
                      {errorMessage}{' '}
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold underline underline-offset-2"
                      >
                        fale com a gente no WhatsApp
                      </a>
                      .
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={status === 'sending' ? undefined : { y: -2 }}
                    whileTap={status === 'sending' ? undefined : { scale: 0.97 }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-cafe-coral py-4 font-semibold text-white shadow-[0_12px_30px_-10px_rgba(238,107,82,0.8)] transition-colors hover:bg-cafe-coral-dark disabled:cursor-wait disabled:opacity-80"
                  >
                    {status === 'sending' ? (
                      <>
                        <span>Enviando...</span>
                        <Loader2 className="h-5 w-5 animate-spin" />
                      </>
                    ) : (
                      <>
                        <span>Enviar Mensagem</span>
                        <Send className="h-5 w-5" />
                      </>
                    )}
                  </motion.button>

                  {/* Aviso de privacidade (LGPD, art. 9º): não é checkbox de
                      consentimento — a base legal do formulário é "procedimentos
                      preliminares a contrato, a pedido do titular" (art. 7º, V),
                      que não depende de aceite. O que a lei exige é informar. */}
                  <p className="text-center text-xs leading-relaxed text-cafe-ink/80">
                    Usamos seus dados só para responder ao seu contato e falar sobre os cursos, e os
                    guardamos por até 12 meses se você não se matricular. Saiba mais na{' '}
                    <a
                      href={PRIVACY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-cafe-blue underline underline-offset-2 hover:text-cafe-navy"
                    >
                      Política de Privacidade
                    </a>
                    .
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
