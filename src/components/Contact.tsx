import { useRef, useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Loader2, Mail, Phone, Instagram, Music2, Send } from 'lucide-react';
import { fadeUp, revealItem, scaleIn, slideInLeft, slideInRight, stagger, VIEWPORT } from '../motion/presets';
import { PRIVACY_URL } from '../legal';
import Turnstile, { TURNSTILE_SITE_KEY } from './contact/Turnstile';
import {
  fieldOfServerMessage,
  LIMITS,
  maskPhone,
  normalize,
  suggestEmail,
  validate,
  validateField,
  type ContactErrors,
  type ContactField,
  type ContactPayload,
  type ContactValues,
} from './contact/validation';

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
const inputErrorClass =
  'w-full rounded-xl border border-cafe-coral bg-white px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-cafe-coral';

function FieldError({ field, errors }: { field: ContactField; errors: ContactErrors }) {
  if (!errors[field]) return null;
  return (
    <p id={`${field}-error`} className="mt-1.5 text-sm text-cafe-coral-dark">
      {errors[field]}
    </p>
  );
}

/** API da escola (portal). Em dev, aponte VITE_API_URL para o backend local. */
const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? 'https://api.escolacafeidiomas.com.br';

const WHATSAPP_URL = `https://wa.me/553499690446?text=${encodeURIComponent(
  'Olá! Vim pelo site Café Idiomas e gostaria de saber mais sobre os cursos.',
)}`;

type Status = 'idle' | 'sending' | 'sent' | 'error';

const EMPTY: ContactValues = { name: '', email: '', phone: '', language: '', level: '', message: '' };

/** Tempo máximo de espera pela API antes de oferecer o WhatsApp. */
const REQUEST_TIMEOUT_MS = 15_000;

/** Lê `message` do corpo de erro da API (string ou lista do ValidationPipe). */
async function serverMessages(res: Response): Promise<string[]> {
  try {
    const body = (await res.json()) as { message?: unknown };
    const m = body?.message;
    const list = Array.isArray(m) ? m : [m];
    // Texto da API vira só texto no React (sem HTML), mas limita o tamanho mesmo assim.
    return list.filter((x): x is string => typeof x === 'string' && x.length > 0).map((x) => x.slice(0, 200));
  } catch {
    return [];
  }
}

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [honeypot, setHoneypot] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [turnstileFailed, setTurnstileFailed] = useState(false);
  const sendingRef = useRef(false);

  const emailSuggestion = errors.email ? undefined : suggestEmail(values.email);

  const setField = (field: ContactField, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    // Corrigiu o campo: some o erro dele; o próximo blur/submit valida de novo.
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validateOnBlur = (field: ContactField) => {
    // Só valida campo já preenchido no blur: tabular pelo form não acende tudo em vermelho.
    if (!values[field].trim()) return;
    setErrors((e) => ({ ...e, [field]: validateField(field, values) }));
  };

  const fieldProps = (field: ContactField) => ({
    id: field,
    name: field,
    value: values[field],
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
    onBlur: () => validateOnBlur(field),
    className: errors[field] ? inputErrorClass : inputClass,
  });

  const resetTurnstile = () => {
    setTurnstileToken('');
    setTurnstileKey((k) => k + 1);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Ref, não só o state: dois cliques no mesmo frame ainda veem o state antigo.
    if (sendingRef.current) return;

    const form = e.currentTarget;
    const clientErrors = validate(values);
    if (Object.values(clientErrors).some(Boolean)) {
      setErrors(clientErrors);
      setStatus('idle');
      const first = (['name', 'email', 'phone', 'message'] as const).find((f) => clientErrors[f]);
      if (first) form.querySelector<HTMLElement>(`#${first}`)?.focus();
      return;
    }

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setErrorMessage(
        turnstileFailed
          ? 'Não conseguimos carregar a verificação anti-robô. Recarregue a página ou'
          : 'Aguarde a verificação anti-robô terminar e envie de novo. Se preferir,',
      );
      setStatus('error');
      return;
    }

    // Monta o corpo campo a campo: nada além do que a API aceita sai daqui.
    const clean = normalize(values);
    const payload: ContactPayload = { ...clean, website: honeypot };
    if (TURNSTILE_SITE_KEY) payload.turnstileToken = turnstileToken;

    sendingRef.current = true;
    setStatus('sending');
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const res = await fetch(`${API_URL}/public/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
        credentials: 'omit',
      });

      if (res.ok) {
        setValues(EMPTY);
        setErrors({});
        setStatus('sent');
        return;
      }

      const messages = await serverMessages(res);
      if (res.status === 400) {
        // Erro de um campo: mostra nele, como na validação local.
        const fieldErrors: ContactErrors = {};
        for (const m of messages) {
          const field = fieldOfServerMessage(m);
          if (field && !fieldErrors[field]) fieldErrors[field] = m;
        }
        if (Object.keys(fieldErrors).length) {
          setErrors(fieldErrors);
          setStatus('idle');
          return;
        }
      }

      setErrorMessage(
        res.status === 429
          ? `${messages[0] ?? 'Você já enviou mensagens demais.'} Tente de novo mais tarde ou`
          : res.status === 400
            ? `${messages[0] ?? 'Confira os dados do formulário.'} Se preferir,`
            : 'Não conseguimos enviar sua mensagem agora. Tente novamente ou',
      );
      setStatus('error');
    } catch {
      setErrorMessage(
        controller.signal.aborted
          ? 'O servidor demorou para responder. Tente novamente ou'
          : 'Sem conexão com o servidor. Tente novamente ou',
      );
      setStatus('error');
    } finally {
      window.clearTimeout(timer);
      sendingRef.current = false;
      // Token do Turnstile é de uso único: qualquer tentativa gasta.
      if (TURNSTILE_SITE_KEY) resetTurnstile();
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
                <form className="relative space-y-6" onSubmit={handleSubmit} noValidate>
                  {/* Honeypot anti-spam: invisível para pessoas, bots costumam preencher. */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <label htmlFor="website">Não preencha este campo</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-semibold text-cafe-navy">
                      Nome Completo
                    </label>
                    <input
                      {...fieldProps('name')}
                      type="text"
                      required
                      maxLength={LIMITS.name}
                      autoComplete="name"
                      placeholder="Seu nome"
                      onChange={(e) => setField('name', e.target.value)}
                    />
                    <FieldError field="name" errors={errors} />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-cafe-navy">
                      Email
                    </label>
                    <input
                      {...fieldProps('email')}
                      type="email"
                      inputMode="email"
                      required
                      maxLength={LIMITS.email}
                      autoComplete="email"
                      autoCapitalize="off"
                      spellCheck={false}
                      placeholder="seu@email.com"
                      onChange={(e) => setField('email', e.target.value)}
                    />
                    <FieldError field="email" errors={errors} />
                    {emailSuggestion && (
                      <p className="mt-1.5 text-sm text-cafe-ink">
                        Você quis dizer{' '}
                        <button
                          type="button"
                          onClick={() => setField('email', emailSuggestion)}
                          className="font-semibold text-cafe-blue underline underline-offset-2 hover:text-cafe-navy"
                        >
                          {emailSuggestion}
                        </button>
                        ?
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-cafe-navy">
                      Telefone
                    </label>
                    <input
                      {...fieldProps('phone')}
                      type="tel"
                      inputMode="tel"
                      required
                      maxLength={LIMITS.phone}
                      autoComplete="tel"
                      placeholder="(34) 99999-9999"
                      onChange={(e) => setField('phone', maskPhone(e.target.value))}
                    />
                    <FieldError field="phone" errors={errors} />
                  </div>

                  <div>
                    <label htmlFor="language" className="mb-2 block text-sm font-semibold text-cafe-navy">
                      Idioma de Interesse
                    </label>
                    <select {...fieldProps('language')} onChange={(e) => setField('language', e.target.value)}>
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
                    <select {...fieldProps('level')} onChange={(e) => setField('level', e.target.value)}>
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
                      {...fieldProps('message')}
                      rows={4}
                      maxLength={LIMITS.message}
                      className={`${errors.message ? inputErrorClass : inputClass} resize-none`}
                      placeholder="Conte-nos um pouco sobre seus objetivos..."
                      onChange={(e) => setField('message', e.target.value)}
                    ></textarea>
                    <FieldError field="message" errors={errors} />
                  </div>

                  {TURNSTILE_SITE_KEY && (
                    <Turnstile
                      key={turnstileKey}
                      onToken={(token) => {
                        setTurnstileToken(token);
                        setTurnstileFailed(false);
                      }}
                      onExpire={() => setTurnstileToken('')}
                      onError={() => {
                        setTurnstileToken('');
                        setTurnstileFailed(true);
                      }}
                    />
                  )}

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
