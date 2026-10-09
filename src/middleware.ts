import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

// CSP com nonce por requisição (padrão oficial do Next.js para App Router):
// o Router injeta <script> inline para hidratar a página (payload de RSC) —
// sem um nonce liberando exatamente esses scripts, 'script-src' precisaria
// de 'unsafe-inline' (abriria a porta pra qualquer <script> injetado, ou
// seja, XSS real) ou bloquearia a própria hidratação do site. Basta o nonce
// ir no header de resposta: o Next detecta sozinho (confirmado nos <link
// rel=preload> que ele mesmo gera, que já saem com o nonce aplicado) e usa o
// mesmo valor nos scripts que injeta — não precisa reconstruir a requisição.
// 'strict-dynamic' libera os chunks carregados a partir de um script já
// confiável (nonced), sem precisar listar cada um. 'unsafe-inline' em
// style-src continua necessário: o app usa `style={{...}}` de verdade
// (gradiente do logo, animações, etc.) e nonce não cobre atributo style="",
// só elementos <script>/<style>.
//
// 'unsafe-eval' só em desenvolvimento: o React dev mode usa eval() para
// reconstruir stack traces e Fast Refresh — "React will never use eval() em
// produção" (aviso do próprio React), então isso nunca chega no ambiente
// real; sem essa liberação só em dev, o overlay do Next acusa um erro falso
// a cada página.
function buildCsp(nonce: string): string {
  const scriptSrc = ["'self'", `'nonce-${nonce}'`, "'strict-dynamic'"];
  if (process.env.NODE_ENV !== "production") scriptSrc.push("'unsafe-eval'");

  return [
    "default-src 'self'",
    `script-src ${scriptSrc.join(" ")}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    // api.web3forms.com: o formulário de contato (Contact.tsx) é um <form>
    // nativo de verdade que submete pra lá — não fetch/AJAX. O plano
    // gratuito do Web3Forms recusa chamada servidor-a-servidor e não libera
    // CORS pra leitura de resposta via fetch (confirmado testando direto
    // contra a API, com a origem real de produção), então a submissão
    // precisa ser uma navegação nativa mesmo — é o que form-action controla.
    "form-action 'self' https://api.web3forms.com",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

// Fica em middleware.ts, não proxy.ts: o Next 16 renomeou o arquivo pra
// "proxy", mas proxy.ts roda obrigatoriamente em runtime Node.js — a própria
// documentação do Next diz "se quiser continuar usando o Edge runtime,
// continue usando middleware". A Vercel ainda espera Edge aqui pra reescrever
// a rota de locale (next-intl) antes da requisição chegar nas funções da
// aplicação; com proxy.ts (Node.js) o rewrite de "/" -> "/pt" não acontecia
// e todas as rotas voltavam 404 em produção, mesmo com o build passando
// local. Reverter para middleware.ts resolve — o aviso de depreciação no
// terminal é só cosmético por enquanto (o próprio Next diz que vai dar
// instruções de Edge pra "proxy" numa versão futura).
export default function middleware(request: NextRequest) {
  // btoa (Web padrão), não Buffer: mais portável entre Edge e Node — não
  // custa nada manter, mesmo o Edge sendo o runtime real aqui.
  const nonce = btoa(crypto.randomUUID());
  const csp = buildCsp(nonce);

  // next-intl decide roteamento (redirect/rewrite por locale) com a
  // requisição original — não mexe nela, só na resposta que ele devolve.
  const response = handleI18nRouting(request);
  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("x-nonce", nonce);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
