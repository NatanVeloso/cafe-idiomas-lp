import { useEffect, useRef } from 'react';

/**
 * Cloudflare Turnstile (captcha sem quebra-cabeça).
 *
 * Só liga com `VITE_TURNSTILE_SITE_KEY` no site **e** `TURNSTILE_SECRET_KEY` na API.
 * As duas chaves andam juntas: com a chave só na API, todo envio é recusado; com
 * a chave só no site, o token é ignorado.
 *
 * O token vale para um envio só: depois de cada tentativa, troque a `key` do
 * componente para ele renderizar um widget novo.
 */
export const TURNSTILE_SITE_KEY = (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined) || '';

const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

interface TurnstileApi {
  render(el: HTMLElement, opts: Record<string, unknown>): string;
  remove(widgetId: string): void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error('turnstile')));
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error('turnstile'));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

interface Props {
  onToken: (token: string) => void;
  onExpire: () => void;
  onError: () => void;
}

export default function Turnstile({ onToken, onExpire, onError }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // Callbacks mais recentes sem re-renderizar o widget a cada render do formulário.
  const handlers = useRef({ onToken, onExpire, onError });
  handlers.current = { onToken, onExpire, onError };

  useEffect(() => {
    let widgetId: string | undefined;
    let cancelled = false;
    loadTurnstile()
      .then((api) => {
        if (cancelled || !ref.current) return;
        widgetId = api.render(ref.current, {
          sitekey: TURNSTILE_SITE_KEY,
          language: 'pt-br',
          // Não injeta <input name="cf-turnstile-response"> no form: o token vai no JSON.
          'response-field': false,
          callback: (token: string) => handlers.current.onToken(token),
          'expired-callback': () => handlers.current.onExpire(),
          'error-callback': () => handlers.current.onError(),
        });
      })
      .catch(() => handlers.current.onError());
    return () => {
      cancelled = true;
      if (widgetId) window.turnstile?.remove(widgetId);
    };
  }, []);

  return <div ref={ref} className="flex min-h-[65px] justify-center" />;
}
