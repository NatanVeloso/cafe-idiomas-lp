/**
 * Variantes da landing page.
 *
 * O mesmo app gera três páginas (build multi-página do Vite, ver `vite.config.ts`):
 *   /         → `index.html`          → variante `geral` (home original, Inglês e Francês)
 *   /ingles   → `ingles/index.html`   → variante `ingles`
 *   /frances  → `frances/index.html`  → variante `frances`
 *
 * Cada HTML marca a variante em `<div id="root" data-variant="...">`. Título, description e
 * Open Graph ficam no próprio HTML (os robôs do WhatsApp/Facebook não executam JS).
 *
 * Os textos da variante `geral` são os da home: mexeu neles, mudou a home.
 */
export type Variant = 'geral' | 'ingles' | 'frances';

function readVariant(): Variant {
  const v = typeof document !== 'undefined' ? document.getElementById('root')?.dataset.variant : undefined;
  return v === 'ingles' || v === 'frances' ? v : 'geral';
}

export const VARIANT: Variant = readVariant();

/** Idioma da página; `null` na home, que fala dos dois. */
export const PAGE_LANGUAGE: 'ingles' | 'frances' | null = VARIANT === 'geral' ? null : VARIANT;

/** `true` em /ingles e /frances: página enxuta, focada num idioma só (sem "Sobre Nós", sem card Trilíngue). */
export const IS_LANGUAGE_PAGE = PAGE_LANGUAGE !== null;

/** Monta a mensagem pronta do WhatsApp; nas páginas de idioma ela já diz o curso de interesse. */
export function whatsappMessage(geral: string, idioma: (curso: string) => string): string {
  if (VARIANT === 'ingles') return idioma('inglês');
  if (VARIANT === 'frances') return idioma('francês');
  return geral;
}

type Copy = {
  heroBadge: string;
  heroTitle: string;
  heroAccent: string[];
  heroSubtitle: string;
  heroChip: { title: string; desc: string };
  aboutResult: string;
  videosSubtitle: string;
  coursesTitle: string;
};

const COPY: Record<Variant, Copy> = {
  geral: {
    heroBadge: 'Aulas ao vivo · Inglês e Francês',
    heroTitle: 'Aprenda Inglês e Francês com Naturalidade e Segurança',
    heroAccent: ['Naturalidade', 'Segurança'],
    heroSubtitle:
      'Aulas individuais ou em dupla, ao vivo e online. Escolha a modalidade ideal para você e aprenda com confiança, no seu ritmo e com foco na conversação!',
    heroChip: { title: 'Inglês e Francês', desc: 'Dois idiomas, infinitas oportunidades' },
    aboutResult: 'Aprender uma língua estrangeira deixa de ser um sonho distante e vira parte da sua vida',
    videosSubtitle: 'Histórias reais de quem transformou sua comunicação em inglês e francês',
    coursesTitle: 'Cursos e Planos',
  },
  ingles: {
    heroBadge: 'Aulas ao vivo · Curso de Inglês',
    heroTitle: 'Destrave seu Inglês e Fale com Segurança',
    heroAccent: ['Destrave', 'Segurança'],
    heroSubtitle:
      'Para quem já estudou e ainda trava na hora de falar. Aulas individuais ou em dupla, ao vivo e online, com foco total em conversação.',
    heroChip: { title: 'Curso de Inglês', desc: 'Do zero à fluência, no seu ritmo' },
    aboutResult: 'Falar inglês deixa de ser um sonho distante e vira parte da sua vida',
    videosSubtitle: 'Histórias reais de quem transformou sua comunicação com a Café Idiomas',
    coursesTitle: 'Planos do Curso de Inglês',
  },
  frances: {
    heroBadge: 'Aulas ao vivo · Curso de Francês',
    heroTitle: 'Aprenda Francês do Zero e Converse com Confiança',
    heroAccent: ['Converse', 'Confiança'],
    heroSubtitle:
      'Saia do bonjour e chegue a conversas de verdade. Aulas individuais ou em dupla, ao vivo e online, no seu ritmo.',
    heroChip: { title: 'Curso de Francês', desc: 'Do zero à fluência, no seu ritmo' },
    aboutResult: 'Falar francês deixa de ser um sonho distante e vira parte da sua vida',
    videosSubtitle: 'Histórias reais de quem transformou sua comunicação com a Café Idiomas',
    coursesTitle: 'Planos do Curso de Francês',
  },
};

export const copy = COPY[VARIANT];

/**
 * Nas páginas de idioma, depoimentos do idioma da página vêm primeiro (ordem estável).
 * Na home a lista fica como está.
 */
export function relevantFirst<T extends { course: string }>(items: T[]): T[] {
  if (!PAGE_LANGUAGE) return items;
  const re = PAGE_LANGUAGE === 'ingles' ? /ingl[eê]s/i : /franc[eê]s/i;
  return [...items.filter((i) => re.test(i.course)), ...items.filter((i) => !re.test(i.course))];
}
