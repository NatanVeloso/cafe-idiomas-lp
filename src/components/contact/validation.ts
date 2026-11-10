/**
 * Validação do formulário "Entre em Contato".
 *
 * Espelha as regras da API (`portal/backend/src/modules/mail/contact/contact-request.dto.ts`
 * e `contact-guard.service.ts`). **Quem protege é a API**: isto aqui existe para a
 * pessoa ver o erro no campo antes de enviar, e para nada ser descartado em silêncio
 * (a API responde 204 a mensagens com cara de spam, como se tivessem sido enviadas).
 * Se uma regra mudar lá, muda aqui junto.
 */

export const LANGUAGES = ['', 'ingles', 'frances', 'ambos'] as const;
export const LEVELS = ['', 'iniciante', 'basico', 'intermediario', 'avancado'] as const;

export interface ContactValues {
  name: string;
  email: string;
  phone: string;
  language: string;
  level: string;
  message: string;
}

export type ContactField = keyof ContactValues;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const LIMITS = { name: 120, email: 160, phone: 25, message: 2000 } as const;

/** Corpo exato que a API aceita. Campo a mais = 400 (`forbidNonWhitelisted`). */
export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  language: string;
  level: string;
  message: string;
  website: string;
  turnstileToken?: string;
}

// Mesmos padrões do DTO da API.
const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}' .-]*$/u;
const PHONE_CHARS_RE = /^[0-9+()\-. ]+$/;
const EMAIL_RE =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/;
const LINK_RE = /(https?:\/\/|www\.)\S+/gi;
/** Caracteres de controle. CR/LF fora da mensagem é tentativa de injeção de cabeçalho. */
// Os caracteres de controle são o alvo destas regex, de propósito.
// eslint-disable-next-line no-control-regex
const CONTROL_RE = /[\u0000-\u001F\u007F]/g;
// eslint-disable-next-line no-control-regex
const CONTROL_KEEP_NEWLINES_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

function clean(value: string, keepNewlines = false): string {
  return keepNewlines
    ? value.replace(CONTROL_KEEP_NEWLINES_RE, '').replace(/\r\n?/g, '\n').trim()
    : value.replace(CONTROL_RE, ' ').replace(/\s+/g, ' ').trim();
}

/** Normaliza o que a pessoa digitou no formato que vai para a API. */
export function normalize(v: ContactValues): ContactValues {
  return {
    name: clean(v.name),
    // Espaço no meio do e-mail não é removido: aí o endereço é recusado em vez de virar outro.
    email: clean(v.email).toLowerCase(),
    phone: clean(v.phone),
    language: (LANGUAGES as readonly string[]).includes(v.language) ? v.language : '',
    level: (LEVELS as readonly string[]).includes(v.level) ? v.level : '',
    message: clean(v.message, true),
  };
}

export function validateField(field: ContactField, raw: ContactValues): string | undefined {
  const v = normalize(raw);
  switch (field) {
    case 'name':
      if (v.name.length < 2) return 'Informe seu nome.';
      if (v.name.length > LIMITS.name) return `Use no máximo ${LIMITS.name} caracteres.`;
      if (!NAME_RE.test(v.name)) return 'Use só letras no nome.';
      return undefined;
    case 'email':
      if (!v.email) return 'Informe seu e-mail.';
      if (v.email.length > LIMITS.email || !EMAIL_RE.test(v.email)) return 'Informe um e-mail válido.';
      return undefined;
    case 'phone': {
      if (!v.phone) return 'Informe seu telefone.';
      const digits = v.phone.replace(/\D/g, '').length;
      if (v.phone.length > LIMITS.phone || !PHONE_CHARS_RE.test(v.phone) || digits < 10 || digits > 13) {
        return 'Informe um telefone válido com DDD.';
      }
      return undefined;
    }
    case 'message': {
      if (v.message.length > LIMITS.message) return `Use no máximo ${LIMITS.message} caracteres.`;
      // A API descarta em silêncio mensagem com mais de 1 link: avisar aqui evita
      // que a pessoa veja "enviada" e a escola nunca receba.
      const links = v.message.match(LINK_RE)?.length ?? 0;
      if (links > 1) return 'Envie no máximo 1 link na mensagem.';
      return undefined;
    }
    default:
      return undefined;
  }
}

export function validate(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  for (const field of ['name', 'email', 'phone', 'message'] as const) {
    const error = validateField(field, values);
    if (error) errors[field] = error;
  }
  return errors;
}

/**
 * Máscara de telefone brasileiro: (34) 99999-9999 / (34) 3333-3333.
 * Começando com "+" (número de fora ou com DDI), só filtra os caracteres.
 */
export function maskPhone(input: string): string {
  if (input.trimStart().startsWith('+')) {
    return input.replace(/[^0-9+()\-. ]/g, '').slice(0, LIMITS.phone);
  }
  const d = input.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/** Erros de digitação comuns no domínio. A API recusa domínio que não recebe e-mail. */
const DOMAIN_TYPOS: Record<string, string> = {
  'gmail.con': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmail.com.br': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gmial.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'gnail.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'hotmail.con': 'hotmail.com',
  'hotmal.com': 'hotmail.com',
  'hotmial.com': 'hotmail.com',
  'hotmai.com': 'hotmail.com',
  'outlook.con': 'outlook.com',
  'outlok.com': 'outlook.com',
  'yahoo.con': 'yahoo.com',
  'yahoo.com.b': 'yahoo.com.br',
  'icloud.con': 'icloud.com',
};

/** Sugestão "Você quis dizer …?" para o e-mail, ou `undefined`. */
export function suggestEmail(email: string): string | undefined {
  const [local, domain] = email.trim().toLowerCase().split('@');
  if (!local || !domain) return undefined;
  const fixed = DOMAIN_TYPOS[domain];
  return fixed ? `${local}@${fixed}` : undefined;
}

/**
 * Leva a mensagem de um 400 da API para o campo certo. As mensagens de nome,
 * e-mail e telefone vêm do DTO e do guard da API, em português.
 */
export function fieldOfServerMessage(message: string): ContactField | undefined {
  const m = message.toLowerCase();
  if (m.includes('e-mail') || m.includes('domínio')) return 'email';
  if (m.includes('telefone')) return 'phone';
  if (m.includes('nome')) return 'name';
  return undefined;
}
