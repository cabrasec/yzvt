"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/Container";
import { WhatsAppIcon } from "@/components/Closing";
import { WHATSAPP_DISPLAY, getWhatsAppUrl } from "@/lib/contact";

type FormValues = {
  nome: string;
  empresa: string;
  email: string;
  whatsapp: string;
  necessidade: string;
  mensagem: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type Status = "idle" | "submitting" | "success" | "error";

const emptyValues: FormValues = {
  nome: "",
  empresa: "",
  email: "",
  whatsapp: "",
  necessidade: "",
  mensagem: "",
};

const necessidadeOptions = ["automacao", "software", "desenvolvimentoWeb", "produtoDigital", "outro"] as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  "group inline-flex w-full items-center justify-center gap-2.5 border border-accent-2/70 px-6 py-3 text-sm font-semibold text-text transition-colors duration-200 hover:border-accent-2 hover:bg-accent-2/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-2 disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto";

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
  const whatsappUrl = getWhatsAppUrl(tCommon("whatsappGreeting"));
  const idPrefix = useId();
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values, t);
    setErrors(nextErrors);

    const firstInvalid = (Object.keys(nextErrors) as (keyof FormValues)[])[0];
    if (firstInvalid) {
      const targetId = firstInvalid === "necessidade" ? `${idPrefix}-necessidade-0` : fieldId(firstInvalid);
      document.getElementById(targetId)?.focus();
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("request_failed");

      setStatus("success");
      setValues(emptyValues);
    } catch {
      setStatus("error");
    }
  }

  const isSubmitting = status === "submitting";

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
          </div>

          <div className="mt-14 lg:mt-0">
            {status === "success" ? (
              <div role="status" tabIndex={-1} className="max-w-md border border-accent-2/40 bg-accent-2/[0.05] px-6 py-8 sm:px-8 sm:py-10">
                <p className="text-lg font-semibold text-text">{t("successTitle")}</p>
                <p className="mt-2 text-text/70">{t("successBody")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="max-w-xl">
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

                {status === "error" && (
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
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
