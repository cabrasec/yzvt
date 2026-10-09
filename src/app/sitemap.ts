import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { localizedUrl } from "@/lib/site";

// Um path por rota real do site (sem prefixo de locale) — o sitemap gera as
// 3 versões de cada um automaticamente via localizedUrl/buildAlternates.
const paths = [
  "",
  "/quem-somos",
  "/privacidade",
  "/insights",
  "/insights/quando-uma-planilha-deixa-de-ser-suficiente",
  "/insights/sua-empresa-ainda-depende-de-tarefas-que-poderiam-acontecer-sozinhas",
  "/insights/sua-empresa-esta-perdendo-clientes-por-nao-ter-uma-pagina-que-vende",
  "/insights/e-se-um-problema-interno-pudesse-virar-um-produto",
  "/o-que-fazemos",
  "/o-que-fazemos/infraestrutura",
  "/o-que-fazemos/cloud",
  "/o-que-fazemos/automacoes",
  "/o-que-fazemos/desenvolvimento-web",
  "/o-que-fazemos/softwares-plataformas",
  "/o-que-fazemos/saas-microsaas",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: localizedUrl(locale, path),
      alternates: {
        languages: Object.fromEntries(routing.locales.map((loc) => [loc, localizedUrl(loc, path)])),
      },
    })),
  );
}
