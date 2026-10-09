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
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

export default function proxy(request: NextRequest) {
  // btoa (Web padrão), não Buffer: o middleware roda no Edge Runtime na
  // Vercel por padrão, que não tem as APIs nativas do Node — Buffer
  // funcionava em `next dev`/`next start` (Node.js local) mas quebraria no
  // deploy de verdade.
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
