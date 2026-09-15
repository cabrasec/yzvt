import Link from "next/link";
import { Container } from "@/components/Container";
import { buttonClasses } from "@/components/Button";
import { BlueprintMark } from "@/components/hero/BlueprintMark";

const corners = [
  "-left-1.5 -top-1.5 border-l-2 border-t-2",
  "-right-1.5 -top-1.5 border-r-2 border-t-2",
  "-left-1.5 -bottom-1.5 border-l-2 border-b-2",
  "-right-1.5 -bottom-1.5 border-r-2 border-b-2",
];

export function Hero() {
  return (
    <section className="blueprint-grid py-20 sm:py-28 lg:py-32">
      <Container>
        <div
          aria-hidden="true"
          className="mb-2 hidden justify-end text-right text-[10px] uppercase tracking-[0.15em] text-text/40 sm:flex"
        >
          <div className="flex flex-col gap-0.5">
            <span>Ideias</span>
            <span>Processos</span>
            <span>Resultados</span>
          </div>
        </div>

        <div className="relative overflow-hidden border border-dashed border-divider px-6 py-14 sm:px-10 sm:py-20 lg:px-16">
          {corners.map((position) => (
            <span
              key={position}
              aria-hidden="true"
              className={`absolute h-4 w-4 border-accent ${position}`}
            />
          ))}

          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
            <div className="max-w-xl">
              <p className="mb-5 text-xs uppercase tracking-[0.2em] text-accent">
                Software · IA · Infraestrutura
              </p>

              <h1 className="text-4xl font-bold tracking-[-0.02em] sm:text-5xl lg:text-6xl">
                Tecnologia para empresas que querem{" "}
                <span className="text-accent">evoluir.</span>
              </h1>

              <p className="mt-6 max-w-lg text-lg text-text/80">
                Criamos softwares, automações e soluções digitais para
                pequenas e médias empresas.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link href="/contato" className={buttonClasses("primary")}>
                  Fale conosco
                </Link>
                <Link href="/o-que-fazemos" className={buttonClasses("secondary")}>
                  O que fazemos
                </Link>
              </div>

              <p className="mt-10 max-w-sm border-t border-divider pt-4 text-sm italic text-text/50">
                Projetamos software como se projeta uma estrutura.
              </p>
            </div>

            <BlueprintMark />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="mt-4 hidden flex-col gap-0.5 text-[10px] uppercase tracking-[0.15em] text-text/40 sm:flex"
        >
          <span>Arquitetura</span>
          <span>Tecnologia</span>
          <span>Pessoas</span>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-divider pt-4 text-xs uppercase tracking-[0.15em] text-text/50">
          <span className="font-bold normal-case tracking-[-0.02em] text-text">
            yzevtech
          </span>
          <span>Tecnologia para o próximo passo</span>
        </div>
      </Container>
    </section>
  );
}
