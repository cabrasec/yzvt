import Link from "next/link";
import { Container } from "@/components/Container";
import { buttonClasses } from "@/components/Button";
import { BlueprintMark } from "@/components/hero/BlueprintMark";
import { RevealWord } from "@/components/hero/RevealWord";

const corners = [
  "-left-1.5 -top-1.5 border-l-2 border-t-2",
  "-right-1.5 -top-1.5 border-r-2 border-t-2",
  "-left-1.5 -bottom-1.5 border-l-2 border-b-2",
  "-right-1.5 -bottom-1.5 border-r-2 border-b-2",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden blueprint-grid py-12 sm:py-16 lg:flex lg:min-h-[min(calc(100svh-5.375rem),54rem)] lg:flex-col lg:justify-center lg:py-0">
      <Container wide className="lg:pt-14 lg:pb-10">
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

        <div className="relative overflow-hidden border border-dashed border-divider px-6 py-10 sm:px-10 sm:py-14 lg:px-20 lg:py-14">
          {corners.map((position) => (
            <span
              key={position}
              aria-hidden="true"
              className={`absolute h-4 w-4 border-accent ${position}`}
            />
          ))}

          <div className="grid items-start gap-12 lg:grid-cols-[58%_42%] lg:gap-16">
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.2em] text-accent">
                Software · IA · Infraestrutura
              </p>

              <h1 className="text-4xl font-bold tracking-[-0.02em] sm:text-5xl lg:w-[700px] lg:text-[clamp(4.5rem,5vw,5.5rem)] lg:leading-[0.98]">
                Tecnologia para empresas que querem{" "}
                <RevealWord className="bg-[linear-gradient(110deg,#9A72FF_0%,#7C3CFF_45%,#6330D7_100%)] bg-clip-text text-transparent">
                  evoluir.
                </RevealWord>
              </h1>

              <p className="mt-5 max-w-lg text-lg text-text/80">
                Criamos softwares, automações e soluções digitais para
                pequenas e médias empresas.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link href="/o-que-fazemos" className={buttonClasses("secondary")}>
                  O que fazemos
                </Link>
              </div>

              <p className="mt-10 max-w-sm border-t border-divider pt-4 text-sm italic text-[#aaa8b8]">
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

        <div className="mt-6 flex items-center justify-end border-t border-divider pt-4 text-xs uppercase tracking-[0.15em] text-text/50">
          <span>Tecnologia para o próximo passo</span>
        </div>
      </Container>
    </section>
  );
}
