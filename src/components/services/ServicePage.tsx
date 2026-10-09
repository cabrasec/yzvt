import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { buttonClasses } from "@/components/Button";
import { Link } from "@/i18n/navigation";

export type ServiceContent = {
  eyebrow: string;
  title: string;
  lead: string;
  sections: { title: string; body: string }[];
  examplesLabel: string;
  examples: string[];
  ctaTitle: string;
  ctaBody: string;
  ctaButtonLabel: string;
};

// Template único para as 6 páginas de serviço (ver src/app/[locale]/o-que-fazemos/*):
// cada uma só muda o conteúdo (via namespace de tradução própria), a estrutura
// visual é a mesma — mesma gramática de hero + seções + exemplos já usada em
// quem-somos e privacidade, "Exemplos de aplicação" reaproveita o padrão do
// Process.tsx na home.
export function ServicePage({ content }: { content: ServiceContent }) {
  return (
    <main className="theme-light bg-bg text-text">
      <section className="border-b border-divider">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{content.eyebrow}</p>
            <div className="mt-6 h-px w-16 bg-accent" aria-hidden="true" />
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl">
              {content.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-text/75">{content.lead}</p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="max-w-2xl space-y-12">
            {content.sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-bold leading-snug tracking-[-0.01em] sm:text-2xl">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-base text-text/75">
                  <p>{section.body}</p>
                </div>
              </div>
            ))}

            <div className="border-t border-divider pt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-2">
                {content.examplesLabel}
              </p>
              <ul className="mt-4 space-y-2.5">
                {content.examples.map((example) => (
                  <li key={example} className="flex gap-3 text-base text-text/75">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent-2" aria-hidden="true" />
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="theme-dark border-t border-divider bg-bg py-20 text-text sm:py-24">
        <Container>
          <div className="max-w-xl">
            <div className="h-px w-16 bg-accent-2" aria-hidden="true" />
            <p className="mt-6 text-2xl font-medium leading-snug tracking-[-0.015em] sm:text-3xl">
              {content.ctaTitle}
            </p>
            <p className="mt-4 text-text/60">{content.ctaBody}</p>

            <Link href="/#contato" className={`${buttonClasses("primary")} mt-8`}>
              {content.ctaButtonLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
