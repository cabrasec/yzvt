import { Container } from "@/components/Container";

type Entry = {
  heading: string;
  text: string;
};

type Panel = {
  number: string;
  phraseTop: string;
  phraseBottom: string;
  entries: Entry[];
  surface: string;
  numberColor: string;
  headingColor: string;
  subColor: string;
  dividerColor: string;
  bodyColor: string;
};

const panels: Panel[] = [
  {
    number: "01",
    phraseTop: "AUTOMATIZE",
    phraseBottom: "seu negócio.",
    surface: "bg-[#0B0B10]",
    numberColor: "text-accent-2",
    headingColor: "text-text",
    subColor: "text-text/80",
    dividerColor: "border-text/15",
    bodyColor: "text-text/65",
    entries: [
      {
        heading: "Automação no WhatsApp",
        text: "Responda clientes, confirme pedidos, envie informações e automatize tarefas do dia a dia.",
      },
      {
        heading: "Tarefas automáticas",
        text: "Deixe tarefas repetitivas acontecerem sozinhas e ganhe tempo para cuidar do seu negócio.",
      },
      {
        heading: "Conecte suas ferramentas",
        text: "Faça seus sistemas trocarem informações sem precisar copiar e colar dados.",
      },
    ],
  },
  {
    number: "02",
    phraseTop: "CRIE",
    phraseBottom: "o que sua empresa precisa.",
    surface: "bg-[#45238A]",
    numberColor: "text-text/60",
    headingColor: "text-text",
    subColor: "text-text/80",
    dividerColor: "border-text/20",
    bodyColor: "text-text/70",
    entries: [
      {
        heading: "Um sistema para sua empresa",
        text: "Tenha uma ferramenta feita para a maneira como o seu negócio funciona.",
      },
      {
        heading: "Site ou aplicação web",
        text: "Crie uma presença digital ou uma ferramenta que ajude sua empresa a vender e trabalhar melhor.",
      },
      {
        heading: "Uma solução sob medida",
        text: "Quando uma ferramenta pronta não resolve, criamos uma solução para sua necessidade.",
      },
    ],
  },
  {
    number: "03",
    phraseTop: "TRANSFORME",
    phraseBottom: "SUA IDEIA.",
    surface: "bg-[#0B0B10]",
    numberColor: "text-accent-2",
    headingColor: "text-text",
    subColor: "text-text/80",
    dividerColor: "border-text/15",
    bodyColor: "text-text/65",
    entries: [
      {
        heading: "Tire sua ideia do papel",
        text: "Transforme uma ideia em uma primeira versão funcionando.",
      },
      {
        heading: "Crie seu próprio produto",
        text: "Desenvolva um software para oferecer aos seus clientes.",
      },
      {
        heading: "SaaS e MicroSaaS",
        text: "Transforme uma solução em um produto digital que pode crescer junto com o negócio.",
      },
    ],
  },
];

export function Process() {
  return (
    <>
      <section className="relative z-0 bg-bg pb-8 pt-20 text-text sm:pb-10 sm:pt-24 lg:pb-10 lg:pt-28">
        <Container>
          <span className="block text-sm tracking-[0.3em] text-accent-2">03</span>
          <h2 className="mt-4 max-w-3xl text-4xl font-bold uppercase leading-[1.05] tracking-[-0.01em] sm:text-5xl lg:text-6xl">
            O que podemos fazer pelo seu negócio.
          </h2>
          <p className="mt-6 max-w-lg text-lg text-text/75">
            Automatize tarefas. Crie sistemas. Transforme ideias em produtos.
          </p>
        </Container>
      </section>

      {/*
        Sticky stacking cards, 100% CSS (sem GSAP, sem interceptar o scroll).
        Cada painel vive dentro de um "slot" alto (motion-safe:h-[180vh]); o
        painel em si é position:sticky com o mesmo top em todos os slots.
        Com slots simplesmente encostados, sobra um vão de exatamente
        1 altura de painel (80vh) entre o painel N se soltar do topo e o
        painel N+1 começar a grudar — nenhum dos dois fica sticky nesse
        intervalo. Por isso cada slot (a partir do 2º) recebe uma margem
        negativa de -80vh, cancelando esse vão: o painel seguinte já está
        colado no topo exatamente quando o anterior se solta, sem salto.
        O container recebe também uma margem negativa fixa (calibrada por
        breakpoint) que puxa o 1º slot para cima, sobrepondo-o à intro —
        assim o Painel 01 já nasce cobrindo o texto da intro, em vez de
        aparecer só depois dela ter rolado para fora.
      */}
      <div className="relative z-10 motion-safe:-mt-[342px] motion-safe:sm:-mt-[353px] motion-safe:lg:-mt-[394px]">
        {panels.map((panel, index) => (
          <div
            key={panel.number}
            className={`relative motion-safe:h-[180vh] ${index > 0 ? "motion-safe:-mt-[80vh]" : ""}`}
            style={{ zIndex: index + 1 }}
          >
            <article
              className={`relative mx-auto flex min-h-[32rem] w-full flex-col justify-start overflow-hidden px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-16 motion-safe:sticky motion-safe:top-[10vh] motion-safe:h-[80vh] motion-safe:min-h-0 motion-safe:w-[92%] ${panel.surface}`}
            >
              <span className={`block text-sm tracking-[0.3em] ${panel.numberColor}`}>
                {panel.number}
              </span>
              <p
                className={`mt-4 text-[clamp(2.75rem,8.5vw,6rem)] font-bold uppercase leading-[0.9] tracking-[-0.02em] ${panel.headingColor}`}
              >
                {panel.phraseTop}
              </p>
              <p
                className={`mt-1 text-[clamp(1.5rem,3.5vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.01em] ${panel.subColor}`}
              >
                {panel.phraseBottom}
              </p>

              <div className={`mt-8 border-t lg:mt-10 ${panel.dividerColor}`} />

              <div className="mt-8 flex flex-col gap-6 lg:mt-10 lg:max-w-2xl lg:gap-8">
                {panel.entries.map((entry) => (
                  <div key={entry.heading}>
                    <p className={`text-base font-semibold sm:text-lg ${panel.headingColor}`}>
                      {entry.heading}
                    </p>
                    <p className={`mt-2 text-sm sm:text-base ${panel.bodyColor}`}>
                      {entry.text}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        ))}
      </div>
    </>
  );
}
