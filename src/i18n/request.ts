import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// Mensagens divididas por namespace (um arquivo por seção do site) em vez de
// um único JSON gigante por idioma — facilita revisar/editar uma seção sem
// mexer nas outras. Cada arquivo exporta um objeto com uma única chave de
// topo (o nome do namespace), e aqui juntamos todos num objeto só.
async function loadMessages(locale: string) {
  const [
    common,
    header,
    footer,
    hero,
    purpose,
    process,
    thoughts,
    contact,
    closing,
    quemSomos,
    privacidade,
    insightsMeta,
    insightsIndex,
    insightPlanilha,
    insightLandingPage,
    insightAutomacao,
    insightProduto,
  ] = await Promise.all([
    import(`../../messages/${locale}/common.json`),
    import(`../../messages/${locale}/header.json`),
    import(`../../messages/${locale}/footer.json`),
    import(`../../messages/${locale}/hero.json`),
    import(`../../messages/${locale}/purpose.json`),
    import(`../../messages/${locale}/process.json`),
    import(`../../messages/${locale}/thoughts.json`),
    import(`../../messages/${locale}/contact.json`),
    import(`../../messages/${locale}/closing.json`),
    import(`../../messages/${locale}/quemSomos.json`),
    import(`../../messages/${locale}/privacidade.json`),
    import(`../../messages/${locale}/insightsMeta.json`),
    import(`../../messages/${locale}/insightsIndex.json`),
    import(`../../messages/${locale}/insightPlanilha.json`),
    import(`../../messages/${locale}/insightLandingPage.json`),
    import(`../../messages/${locale}/insightAutomacao.json`),
    import(`../../messages/${locale}/insightProduto.json`),
  ]);

  return {
    ...common.default,
    ...header.default,
    ...footer.default,
    ...hero.default,
    ...purpose.default,
    ...process.default,
    ...thoughts.default,
    ...contact.default,
    ...closing.default,
    ...quemSomos.default,
    ...privacidade.default,
    ...insightsMeta.default,
    ...insightsIndex.default,
    ...insightPlanilha.default,
    ...insightLandingPage.default,
    ...insightAutomacao.default,
    ...insightProduto.default,
  };
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale),
  };
});
