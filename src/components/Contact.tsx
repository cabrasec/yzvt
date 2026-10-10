"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Check, Compass, ShieldCheck } from "lucide-react";
import { Container } from "@/components/Container";
import { WhatsAppIcon } from "@/components/Closing";
import { WHATSAPP_DISPLAY, getWhatsAppUrl } from "@/lib/contact";
import { localizedUrl } from "@/lib/site";

type FormValues = {
  nome: string;
  empresa: string;
  email: string;
  whatsapp: string;
  necessidade: string;
  mensagem: string;
  // Honeypot: campo real para bots, invisível para humanos (ver estilo mais
  // abaixo). Preenchido = submissão descartada no cliente, nunca sai pro
  // Web3Forms (ver handleSubmit).
  botcheck: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const emptyValues: FormValues = {
  nome: "",
  empresa: "",
  email: "",
  whatsapp: "",
  necessidade: "",
  mensagem: "",
  botcheck: "",
};

const necessidadeOptions = ["automacao", "software", "desenvolvimentoWeb", "produtoDigital", "outro"] as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

function validate(values: FormValues, t: ReturnType<typeof useTranslations>): FormErrors {
  const errors: FormErrors = {};

  if (!values.nome.trim()) errors.nome = t("errors.nome");

  if (!values.email.trim()) {
    errors.email = t("errors.emailRequired");
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = t("errors.emailInvalid");
  }

  if (!values.necessidade) errors.necessidade = t("errors.necessidade");

  if (!values.mensagem.trim()) errors.mensagem = t("errors.mensagem");

  return errors;
}

// Um só tipo de campo: caixa com borda fina. Antes havia três (sublinhado,
// caixa na mensagem e chips com borda) e o sublinhado fazia o placeholder
// parecer valor já digitado.
const fieldClasses =
  "mt-2 w-full border border-divider bg-text/[0.03] px-4 py-3 text-base text-text placeholder:text-text/40 transition-colors duration-200 hover:border-text/25 focus:border-accent-2 focus:bg-text/[0.05] focus:outline-none aria-[invalid=true]:border-red-400/70";

const labelClasses = "block text-xs uppercase tracking-[0.14em] text-text/70";

function Optional({ label }: { label: string }) {
  return <span className="ml-1.5 normal-case tracking-normal text-text/45">{label}</span>;
}

const ctaClasses =
  "group inline-flex w-full items-center justify-center gap-2.5 border border-accent-2 bg-accent-2/[0.1] px-6 py-3 text-sm font-semibold text-text transition-colors duration-200 hover:bg-accent-2/[0.18] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-2 disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-xs text-red-400">
      {message}
    </p>
  );
}

export function Contact() {
  const t = useTranslations("Contact");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const whatsappUrl = getWhatsAppUrl(tCommon("whatsappGreeting"));
  const idPrefix = useId();
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [blockedError, setBlockedError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Chegando com #contato na URL (Header, Footer, CTAs de outras páginas), o
  // scroll automático do navegador às vezes acontece antes do ScrollTrigger
  // da Seção 03 terminar de medir seu pin-spacer, e erra o alvo. Corrige
  // depois que a página (imagens, fontes) termina de carregar de verdade,
  // quando esse layout já assentou.
  useEffect(() => {
    if (window.location.hash !== "#contato") return;

    const scrollToContato = () => {
      document.getElementById("contato")?.scrollIntoView({ block: "start" });
    };

    if (document.readyState === "complete") {
      requestAnimationFrame(() => requestAnimationFrame(scrollToContato));
    } else {
      window.addEventListener(
        "load",
        () => requestAnimationFrame(() => requestAnimationFrame(scrollToContato)),
        { once: true },
      );
    }
  }, []);

  const fieldId = (name: keyof FormValues) => `${idPrefix}-${name}`;

  function updateField<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }

  // Envio é um <form> nativo de verdade (action="https://api.web3forms.com/submit"),
  // não fetch/AJAX: o plano gratuito do Web3Forms recusa chamada
  // servidor-a-servidor E não libera CORS pra leitura da resposta via fetch
  // (confirmado testando direto contra a API, com a origem real de produção,
  // tanto JSON quanto FormData — nos dois casos bloqueado por CORS antes de
  // conseguir ler o resultado). O <form> nativo é literalmente o exemplo que
  // o próprio Web3Forms documenta pro free tier: o navegador sai do site, o
  // Web3Forms processa, e o campo `redirect` abaixo traz de volta pra
  // /obrigado (ver src/app/[locale]/obrigado/page.tsx).
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const nextErrors = validate(values, t);
    setErrors(nextErrors);
    setBlockedError(false);

    const firstInvalid = (Object.keys(nextErrors) as (keyof FormValues)[])[0];
    if (firstInvalid) {
      event.preventDefault();
      const targetId = firstInvalid === "necessidade" ? `${idPrefix}-necessidade-0` : fieldId(firstInvalid);
      document.getElementById(targetId)?.focus();
      return;
    }

    if (!process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY) {
      event.preventDefault();
      setBlockedError(true);
      return;
    }

    // Honeypot: se um bot preencheu o campo invisível, a submissão nunca sai
    // pro Web3Forms — mas finge sucesso pro bot (não dá nenhuma pista de que
    // foi detectado), indo direto pra mesma página de obrigado de um envio
    // real.
    if (values.botcheck.trim() !== "") {
      event.preventDefault();
      window.location.href = localizedUrl(locale, "/obrigado");
      return;
    }

    setIsSubmitting(true);
    // Sem reset de isSubmitting: a página está prestes a navegar pro
    // Web3Forms mesmo (submissão nativa), não para no "idle" de novo aqui.
  }

  return (
    <section
      id="contato"
      className="blueprint-grid scroll-mt-28 border-t border-divider bg-bg pt-20 pb-24 text-text sm:pt-24 sm:pb-28 lg:pt-28 lg:pb-32"
    >
      <Container>
        <div className="lg:grid lg:grid-cols-[2fr_3fr] lg:gap-20">
          <div className="flex max-w-md flex-col">
            <p className="text-xs uppercase tracking-[0.2em] text-accent-2">{t("eyebrow")}</p>
            <div className="mt-6 h-px w-16 bg-accent" aria-hidden="true" />
            <h2 className="mt-6 text-3xl font-medium leading-[1.1] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
              {t("heading")}
            </h2>
            <p className="mt-6 max-w-sm text-lg text-text/70">{t("lead")}</p>

            {/* Caminho direto para quem não quer preencher nada. Ocupa o
                vazio que sobrava abaixo do texto. */}
            <div className="mt-12 border border-divider bg-surface/60 p-6 lg:mt-auto">
              <p className="text-xs uppercase tracking-[0.14em] text-text/60">{t("whatsappBoxLabel")}</p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2.5 text-base font-semibold text-text no-underline transition-colors duration-200 hover:text-accent-2"
              >
                <WhatsAppIcon className="h-5 w-5 text-accent-2" />
                {t("whatsappLinkLabel")}
                <ArrowRight className="h-4 w-4 text-accent-2" aria-hidden="true" />
              </a>
              <p className="mt-3 text-sm text-text/60">{WHATSAPP_DISPLAY}</p>
              <p className="mt-1 text-xs text-text/45">{tCommon("serviceHours")}</p>
            </div>

            {/* Informações institucionais, não acionáveis — reforçam
                confiança sem repetir o canal de contato (WhatsApp acima,
                e-mail já coberto pelo próprio formulário). */}
            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-3">
                <Compass className="mt-0.5 h-5 w-5 shrink-0 text-accent-2" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-text">{t("trust.consultive.title")}</p>
                  <p className="mt-1 text-sm text-text/60">{t("trust.consultive.body")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent-2" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-text">{t("trust.noCommitment.title")}</p>
                  <p className="mt-1 text-sm text-text/60">{t("trust.noCommitment.body")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 lg:mt-0">
            <form
              action={WEB3FORMS_ENDPOINT}
              method="POST"
              onSubmit={handleSubmit}
              noValidate
              className="max-w-xl"
            >
              <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? ""} />
              <input type="hidden" name="subject" value="Novo contato pelo site Yzev Tech" />
              <input type="hidden" name="from_name" value="Site Yzev Tech" />
              <input type="hidden" name="redirect" value={localizedUrl(locale, "/obrigado")} />

              {/* Honeypot anti-spam: fora da tela e fora da ordem de tab,
                  para humanos nunca verem nem alcançarem com teclado — bots
                  que preenchem todo campo que encontram costumam preencher
                  este também. Mesmo nome que o Web3Forms reconhece como
                  honeypot nativo deles, então funciona em duas camadas. */}
              <input
                type="text"
                name="botcheck"
                value={values.botcheck}
                onChange={(e) => updateField("botcheck", e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
              />

              <p className="mb-8 text-sm text-text/55">{t("requiredNote")}</p>

              <div className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2">
                <div>
                  <label htmlFor={fieldId("nome")} className={labelClasses}>
                    {t("fields.nome.label")}
                  </label>
                  <input
                    id={fieldId("nome")}
                    name="nome"
                    type="text"
                    autoComplete="name"
                    placeholder={t("fields.nome.placeholder")}
                    value={values.nome}
                    onChange={(e) => updateField("nome", e.target.value)}
                    aria-required="true"
                    aria-invalid={Boolean(errors.nome)}
                    aria-describedby={errors.nome ? `${fieldId("nome")}-error` : undefined}
                    className={fieldClasses}
                  />
                  <FieldError id={`${fieldId("nome")}-error`} message={errors.nome} />
                </div>

                <div>
                  <label htmlFor={fieldId("empresa")} className={labelClasses}>
                    {t("fields.empresa.label")}
                    <Optional label={t("optional")} />
                  </label>
                  <input
                    id={fieldId("empresa")}
                    name="empresa"
                    type="text"
                    autoComplete="organization"
                    placeholder={t("fields.empresa.placeholder")}
                    value={values.empresa}
                    onChange={(e) => updateField("empresa", e.target.value)}
                    className={fieldClasses}
                  />
                </div>

                <div>
                  <label htmlFor={fieldId("email")} className={labelClasses}>
                    {t("fields.email.label")}
                  </label>
                  <input
                    id={fieldId("email")}
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder={t("fields.email.placeholder")}
                    value={values.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    aria-required="true"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? `${fieldId("email")}-error` : undefined}
                    className={fieldClasses}
                  />
                  <FieldError id={`${fieldId("email")}-error`} message={errors.email} />
                </div>

                <div>
                  <label htmlFor={fieldId("whatsapp")} className={labelClasses}>
                    {t("fields.whatsapp.label")}
                    <Optional label={t("optional")} />
                  </label>
                  <input
                    id={fieldId("whatsapp")}
                    name="whatsapp"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder={t("fields.whatsapp.placeholder")}
                    value={values.whatsapp}
                    onChange={(e) => updateField("whatsapp", e.target.value)}
                    className={fieldClasses}
                  />
                </div>
              </div>

              <fieldset className="mt-8">
                <legend className={labelClasses}>
                  {t("necessidadeLegend")}
                  <span className="ml-1.5 normal-case tracking-normal text-text/45">{t("necessidadeHint")}</span>
                </legend>
                <div
                  role="radiogroup"
                  aria-required="true"
                  aria-invalid={Boolean(errors.necessidade)}
                  aria-describedby={errors.necessidade ? `${idPrefix}-necessidade-error` : undefined}
                  className="mt-3 flex flex-wrap gap-2.5"
                >
                  {necessidadeOptions.map((option, index) => (
                    <label key={option} className="cursor-pointer">
                      <input
                        id={index === 0 ? `${idPrefix}-necessidade-0` : undefined}
                        type="radio"
                        name="necessidade"
                        value={option}
                        checked={values.necessidade === option}
                        onChange={(e) => updateField("necessidade", e.target.value)}
                        className="peer sr-only"
                      />
                      {/* Caixa normal + estado selecionado visível (tinta
                          verde, borda e ✓) — antes, em caixa alta, os chips
                          se confundiam com os rótulos dos campos. */}
                      <span className="inline-flex items-center gap-2 border border-divider px-4 py-2.5 text-sm font-medium text-text/80 transition-colors duration-200 hover:border-text/30 hover:text-text peer-checked:border-accent-2 peer-checked:bg-accent-2/[0.1] peer-checked:text-text peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-2 [&>svg]:hidden peer-checked:[&>svg]:block">
                        <Check className="h-3.5 w-3.5 text-accent-2" aria-hidden="true" />
                        {t(`options.${option}`)}
                      </span>
                    </label>
                  ))}
                </div>
                <FieldError id={`${idPrefix}-necessidade-error`} message={errors.necessidade} />
              </fieldset>

              <div className="mt-8">
                <label htmlFor={fieldId("mensagem")} className={labelClasses}>
                  {t("fields.mensagem.label")}
                </label>
                <textarea
                  id={fieldId("mensagem")}
                  name="mensagem"
                  rows={4}
                  placeholder={t("fields.mensagem.placeholder")}
                  value={values.mensagem}
                  onChange={(e) => updateField("mensagem", e.target.value)}
                  aria-required="true"
                  aria-invalid={Boolean(errors.mensagem)}
                  aria-describedby={errors.mensagem ? `${fieldId("mensagem")}-error` : undefined}
                  className={`${fieldClasses} resize-y min-h-28`}
                />
                <FieldError id={`${fieldId("mensagem")}-error`} message={errors.mensagem} />
              </div>

              {blockedError && (
                <div role="alert" className="mt-8 border border-red-400/40 bg-red-400/[0.06] px-5 py-4 text-sm">
                  <p className="text-red-300">{t("errorTitle")}</p>
                  <p className="mt-1 text-text/70">
                    {t("errorBodyBefore")}{" "}
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-accent-2 underline underline-offset-2">
                      {t("errorBodyLinkLabel")}
                    </a>
                    .
                  </p>
                </div>
              )}

              <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
                <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className={ctaClasses}>
                  {isSubmitting ? t("submitting") : t("submit")}
                  {!isSubmitting && (
                    <ArrowRight
                      className="h-4 w-4 text-accent-2 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>

              <p className="mt-6 max-w-sm text-sm text-text/55">
                {t("consentBefore")}{" "}
                <Link href="/privacidade" className="text-text/75 underline underline-offset-2 hover:text-accent-2">
                  {t("consentLinkLabel")}
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
