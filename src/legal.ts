/**
 * Documentos legais da escola.
 *
 * O site NÃO tem texto próprio: desde 2026-11-08 a Política de Privacidade é
 * única da escola (site + portal) e mora no portal, que já a mantém em PT/EN/FR
 * (`portal/frontend/src/features/legal`). Ter dois textos seria pedir para eles
 * divergirem — e política desatualizada é problema de LGPD.
 *
 * Os dados da escola espelham `portal/frontend/src/features/legal/schoolInfo.ts`.
 * Mudou lá, muda aqui.
 */
const PORTAL_URL = 'https://portal.escolacafeidiomas.com.br';

export const PRIVACY_URL = `${PORTAL_URL}/privacidade`;
export const TERMS_URL = `${PORTAL_URL}/termos`;

export const SCHOOL_LEGAL = {
  legalName: 'Escola Café Idiomas',
  cnpj: '26.993.794/0001-25',
  // Sem endereço/cidade: a escola é 100% online (dono, 2026-11-08). A
  // identificação no rodapé é razão social + CNPJ + e-mail (Decreto 7.962/2013
  // aceita endereço eletrônico).
  privacyEmail: 'cafeidiomass@gmail.com',
} as const;
