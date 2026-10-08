import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { buttonClasses } from "@/components/Button";
import { FlowChain } from "@/components/insights/FlowChain";

export const metadata: Metadata = {
  title: "Quem somos | Yzev",
  description:
    "Conheça a Yzev e nossa forma de pensar tecnologia, software, automação e produtos digitais.",
};

// Nenhum número, cliente, equipe ou case é citado nesta página — apenas o
// posicionamento que já existe no site (Home, Insights). FlowChain é
// reaproveitado do sistema dos Insights para as duas composições de linha
// (não são passos sequenciais estritos, mas a mesma gramática de espinha +
// nós já aprovada serve bem para "relação entre conceitos").

const pilares = [
  {
    title: "Automação & IA",
    text: "Tarefas repetitivas automatizadas, para que a equipe gaste tempo com o que exige atenção.",
  },
  {
    title: "Software & Web",
    text: "Sistemas, sites e plataformas construídos sob medida para a realidade do negócio.",
  },
  {
    title: "SaaS & MicroSaaS",
    text: "Soluções internas validadas e transformadas em produtos para outras empresas usarem.",
  },
];

const etapas = [
  {
    title: "Entender",
    text: "Mapear o problema e entender como o trabalho realmente acontece.",
  },
  {
    title: "Projetar",
    text: "Encontrar a solução adequada antes de começar a construir.",
  },
  {
    title: "Construir",
    text: "Transformar a ideia em software, automação ou produto.",
  },
  {
    title: "Evoluir",
    text: "Melhorar a solução conforme novas necessidades aparecem.",
  },
];

export default function QuemSomosPage() {
  return (
    <main className="theme-light bg-bg text-text">
      {/* HERO */}
      <section className="border-b border-divider">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Quem somos</p>
            <div className="mt-6 h-px w-16 bg-accent" aria-hidden="true" />
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl lg:text-[3.25rem]">
              Tecnologia para o próximo passo.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-text/75">
              A Yzev cria software, automações e soluções digitais para
              empresas que querem evoluir.
            </p>
          </div>
        </Container>
      </section>

      {/* COMO PENSAMOS */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="lg:grid lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                Projetamos tecnologia a partir de problemas reais.
              </h2>
              <div className="mt-8 space-y-5 text-lg text-text/75">
                <p>
                  Nem todo problema precisa de um sistema novo. Nem toda
                  tarefa precisa ser automatizada. Nem toda ideia precisa
                  começar grande.
                </p>
                <p>
                  Primeiro entendemos como o trabalho acontece. Depois
                  pensamos no que pode ser simplificado, automatizado,
                  transformado em software ou desenvolvido como produto.
                </p>
              </div>
            </div>

            <div className="mt-14 lg:mt-0 lg:flex lg:items-center">
              <FlowChain steps={["Automatizar", "Criar", "Evoluir"]} className="w-full max-w-sm" />
            </div>
          </div>
        </Container>
      </section>

      {/* O QUE FAZEMOS */}
      <section className="theme-dark border-y border-divider bg-bg py-20 text-text sm:py-24">
        <Container>
          <p className="text-xs uppercase tracking-[0.2em] text-accent-2">O que fazemos</p>
          <div className="mt-10 grid grid-cols-1 gap-10 border-t border-divider pt-10 sm:grid-cols-3 sm:gap-8">
            {pilares.map((pilar) => (
              <div key={pilar.title}>
                <h3 className="text-xl font-bold leading-snug tracking-[-0.01em] sm:text-2xl">
                  {pilar.title}
                </h3>
                <p className="mt-3 text-text/70">{pilar.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* NOSSA FORMA DE TRABALHAR */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
            Nossa forma de trabalhar
          </h2>

          <FlowChain
            steps={etapas.map((etapa) => etapa.title)}
            className="mt-10 max-w-md"
          />

          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {etapas.map((etapa) => (
              <div key={etapa.title} className="border-t border-divider pt-4">
                <p className="text-sm font-semibold uppercase tracking-[0.1em] text-text">
                  {etapa.title}
                </p>
                <p className="mt-2 text-sm text-text/70">{etapa.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ENCERRAMENTO */}
      <section className="theme-dark border-t border-divider bg-bg py-24 text-text sm:py-32">
        <Container>
          <div className="max-w-2xl">
            <div className="mb-6 h-px w-16 bg-accent-2" aria-hidden="true" />
            <p className="text-3xl font-bold leading-[1.15] tracking-[-0.01em] sm:text-4xl lg:text-5xl">
              Não acreditamos em tecnologia pela tecnologia.
            </p>
            <p className="mt-4 text-3xl font-bold leading-[1.15] tracking-[-0.01em] text-accent-2 sm:text-4xl lg:text-5xl">
              Construímos soluções para que o próximo passo faça sentido.
            </p>

            <Link href="/#contato" className={`${buttonClasses("primary")} mt-10`}>
              Vamos conversar
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
