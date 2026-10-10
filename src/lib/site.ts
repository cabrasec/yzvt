import { routing } from "@/i18n/routing";

// Fonte única da URL de produção — usada no sitemap, no canonical/hreflang de
// cada página e na imagem de Open Graph compartilhada.
export const SITE_URL = "https://www.yzev.tech";

// pt é o locale padrão (sem prefixo); en/es levam /en, /es — mesma regra do
// middleware (next-intl localePrefix: "as-needed"), replicada aqui porque o
// sitemap/metadata roda fora do contexto de roteamento do next-intl.
export function localizedUrl(locale: string, path: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${path}`;
}

// Monta canonical + hreflang (alternates.languages) de uma página a partir do
// mesmo path (sem o prefixo de locale) nos 3 idiomas — para usar em
// generateMetadata de qualquer página.
export function buildAlternates(locale: string, path: string) {
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = localizedUrl(loc, path);
  }
  languages["x-default"] = localizedUrl(routing.defaultLocale, path);

  return {
    canonical: localizedUrl(locale, path),
    languages,
  };
}

// Marca usada nos metadados (sufixo do <title>, og:site_name) — grafia do logo.
export const SITE_NAME = "yzevtech";

const ogLocales: Record<string, string> = { pt: "pt_BR", en: "en_US", es: "es_ES" };

export const OG_IMAGE = { url: "/img/og-image.png", width: 1200, height: 630, alt: SITE_NAME };

// Open Graph completo de uma página. Precisa ser o objeto inteiro: o Next faz
// merge raso dos metadados, então um `openGraph` na página substitui o do
// layout por completo (siteName e imagem incluídos). og:title/og:description
// não vão aqui — o Next os herda do title/description resolvidos da página.
export function buildOpenGraph(locale: string, path: string, type: "website" | "article" = "website") {
  return {
    type,
    siteName: SITE_NAME,
    url: localizedUrl(locale, path),
    locale: ogLocales[locale],
    alternateLocale: routing.locales.filter((loc) => loc !== locale).map((loc) => ogLocales[loc]),
    images: [OG_IMAGE],
  };
}
