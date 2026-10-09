import os from "node:os";
import path from "node:path";
import type { NextConfig } from "next";

// @swc/core (carregado pelo next-intl/plugin, requerido logo abaixo) recusa
// usar o cache nativo padrão em ~/.cache quando esse diretório — ou um pai
// dele — é gravável por outro usuário sem sticky bit (checagem de segurança
// do próprio binário; comum em ~/.cache com permissões de grupo). Redireciona
// para um diretório sob o tmpdir do SO (tem sticky bit por padrão no Linux)
// antes do plugin carregar. Usa require() (não import) de propósito: imports
// ES são hoisted antes de qualquer código no arquivo, então um `import
// createNextIntlPlugin from "next-intl/plugin"` no topo carregaria o plugin
// (e o @swc/core) antes desta linha rodar.
process.env.SWC_NATIVE_BINDING_CACHE ||= path.join(os.tmpdir(), "yzev-swc-native-cache");

// eslint-disable-next-line @typescript-eslint/no-require-imports
const createNextIntlPlugin = require("next-intl/plugin") as typeof import("next-intl/plugin").default;

// Headers estáticos (sem valor por requisição) — duplicados em vercel.json
// de propósito: se o deploy mudar de plataforma, ou alguém rodar `next
// start` em outro ambiente, isso garante que continuam valendo sem depender
// de onde o site está hospedado. A Content-Security-Policy NÃO está aqui:
// ela precisa de um nonce diferente a cada requisição (ver src/middleware.ts) por
// causa dos <script> inline que o próprio App Router injeta para hidratar a
// página — um valor estático não pode acompanhar isso, por isso vive só no
// middleware (que roda em qualquer plataforma, não só na Vercel).
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "geolocation=(), microphone=(), camera=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
