/**
 * Estrutura mínima de i18n — apenas a lista de idiomas suportados e o padrão
 * do site. Não traduz conteúdo; prepara o terreno para quando a tradução
 * completa for implementada. Novos idiomas entram aqui (ex.: Español) e
 * ficam disponíveis no seletor assim que `available` for true.
 */
export type LocaleCode = "pt" | "en" | "es";

export type LocaleOption = {
  code: LocaleCode;
  label: string;
  available: boolean;
};

export const locales: LocaleOption[] = [
  { code: "pt", label: "Português", available: true },
  { code: "en", label: "English", available: true },
  { code: "es", label: "Español", available: false },
];

export const defaultLocale: LocaleCode = "pt";

export function availableLocales(): LocaleOption[] {
  return locales.filter((locale) => locale.available);
}

export function localeLabel(code: LocaleCode): string {
  return locales.find((locale) => locale.code === code)?.label ?? defaultLocale;
}
