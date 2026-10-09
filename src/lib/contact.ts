/**
 * Canais diretos de contato — fonte única para Contact, Footer e qualquer CTA.
 * >>> Confira INSTAGRAM_URL: o @ foi assumido como "yzevtech". <<<
 * A mensagem pré-preenchida do WhatsApp varia por idioma (mensagens/Common),
 * por isso vira função — cada componente passa o texto já traduzido.
 */
export const WHATSAPP_NUMBER = "5511973737822";
export const WHATSAPP_DISPLAY = "+55 11 97373-7822";
export const INSTAGRAM_HANDLE = "@yzevtech";
export const INSTAGRAM_URL = "https://instagram.com/yzevtech";

export function getWhatsAppUrl(greeting: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(greeting)}`;
}
