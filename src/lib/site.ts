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
