"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";

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

const necessidadeOptions = ["Automação", "Software", "Desenvolvimento Web", "Produto digital", "Outro"];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.nome.trim()) errors.nome = "Informe seu nome.";

  if (!values.email.trim()) {
    errors.email = "Informe seu e-mail.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Informe um e-mail válido.";
  }

  if (!values.necessidade) errors.necessidade = "Selecione uma opção.";

  if (!values.mensagem.trim()) errors.mensagem = "Conte brevemente o que você precisa.";

  return errors;
}

const fieldClasses =
  "mt-2 w-full border-0 border-b border-divider bg-transparent pb-2.5 text-base text-text placeholder:text-text/45 focus:border-accent-2 focus:outline-none transition-colors duration-200";

const labelClasses = "block text-xs uppercase tracking-[0.14em] text-text/70";

// Sem preenchimento, sem radius grande: uma pequena área clicável definida
// por uma borda fina em verde — a mesma gramática dos chips de "O que você
// precisa?" logo acima, em vez do botão preenchido/arredondado padrão do
// site, que aqui soava mais "SaaS" do que editorial.
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

    const nextErrors = validate(values);
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
          <div className="max-w-md">
            <p className="text-xs uppercase tracking-[0.2em] text-accent-2">Contato</p>
            <div className="mt-6 h-px w-16 bg-accent" aria-hidden="true" />
            <h2 className="mt-6 text-3xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
              Vamos construir o próximo passo?
            </h2>
            <p className="mt-6 max-w-sm text-lg text-text/70">
              Conte o que sua empresa precisa resolver. A partir daí, pensamos
              na solução mais adequada.
            </p>
          </div>

          <div className="mt-14 lg:mt-0">
            {status === "success" ? (
              <div role="status" className="max-w-md border border-divider px-6 py-8 sm:px-8 sm:py-10">
                <p className="text-lg font-semibold text-text">Mensagem recebida.</p>
                <p className="mt-2 text-text/70">
                  Vamos analisar o que você descreveu e retornar em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="max-w-xl">
                <div className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
                  <div>
                    <label htmlFor={fieldId("nome")} className={labelClasses}>
                      Nome
                    </label>
                    <input
                      id={fieldId("nome")}
                      name="nome"
                      type="text"
                      autoComplete="name"
                      placeholder="Seu nome"
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
                      Empresa
                    </label>
                    <input
                      id={fieldId("empresa")}
                      name="empresa"
                      type="text"
                      autoComplete="organization"
                      placeholder="Nome da empresa"
                      value={values.empresa}
                      onChange={(e) => updateField("empresa", e.target.value)}
                      className={fieldClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor={fieldId("email")} className={labelClasses}>
                      E-mail
                    </label>
                    <input
                      id={fieldId("email")}
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="seu@email.com"
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
                      WhatsApp
                    </label>
                    <input
                      id={fieldId("whatsapp")}
                      name="whatsapp"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="(00) 00000-0000"
                      value={values.whatsapp}
                      onChange={(e) => updateField("whatsapp", e.target.value)}
                      className={fieldClasses}
                    />
                  </div>
                </div>

                <fieldset className="mt-9">
                  <legend className={labelClasses}>O que você precisa?</legend>
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
                        <span className="inline-block border border-divider px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] text-text/75 transition-colors duration-200 peer-checked:border-accent-2 peer-checked:text-text peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-2">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                  <FieldError id={`${idPrefix}-necessidade-error`} message={errors.necessidade} />
                </fieldset>

                <div className="mt-9">
                  <label htmlFor={fieldId("mensagem")} className={labelClasses}>
                    Mensagem
                  </label>
                  <textarea
                    id={fieldId("mensagem")}
                    name="mensagem"
                    rows={4}
                    placeholder="Conte brevemente o que você precisa resolver."
                    value={values.mensagem}
                    onChange={(e) => updateField("mensagem", e.target.value)}
                    aria-required="true"
                    aria-invalid={Boolean(errors.mensagem)}
                    aria-describedby={errors.mensagem ? `${fieldId("mensagem")}-error` : undefined}
                    className="mt-2 w-full resize-none border border-divider bg-transparent px-4 py-3 text-base text-text placeholder:text-text/35 focus:border-accent-2 focus:outline-none transition-colors duration-200"
                  />
                  <FieldError id={`${fieldId("mensagem")}-error`} message={errors.mensagem} />
                </div>

                {status === "error" && (
                  <p role="alert" className="mt-8 text-sm text-red-400">
                    Não foi possível enviar sua mensagem agora. Tente novamente em instantes.
                  </p>
                )}

                <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
                  <button type="submit" disabled={isSubmitting} className={ctaClasses}>
                    {isSubmitting ? "Enviando..." : "Enviar mensagem"}
                    {!isSubmitting && (
                      <ArrowRight
                        className="h-4 w-4 text-accent-2 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </div>

                <p className="mt-6 max-w-sm text-sm text-text/55">
                  Ao enviar, você concorda com o uso dos seus dados para
                  responder ao contato. Consulte nosso{" "}
                  <Link href="/privacidade" className="text-text/75 underline underline-offset-2 hover:text-accent-2">
                    Aviso de Privacidade
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
