"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Card = {
  title: string;
  subtitle: string;
  body: string;
  complement: string;
  examples: string;
  surface: string;
  side: "left" | "right";
  headingColor: string;
  subColor: string;
  dividerColor: string;
  bodyColor: string;
  labelColor: string;
};

const cards: Card[] = [
  {
    title: "COMUNICAR",
    subtitle: "Conecte sua empresa às pessoas que fazem o negócio acontecer.",
    body: "Para estabelecer interações automatizadas com clientes, colaboradores e parceiros por diferentes canais, como WhatsApp, Instagram, e-mail e outros pontos de contato, tornando o atendimento mais rápido, organizado e adequado ao contexto de cada conversa.",
    complement:
      "A comunicação pode iniciar um atendimento, responder dúvidas, enviar informações, confirmar pedidos, acompanhar solicitações e encaminhar cada interação para o próximo passo do processo.",
    examples:
      "Atendimento pelo WhatsApp, pedidos pelo Instagram, confirmação de pedidos, avisos, acompanhamento de clientes e respostas automatizadas.",
    surface: "bg-[#0B0B10]",
    side: "left",
    headingColor: "text-text",
    subColor: "text-text/80",
    dividerColor: "border-text/15",
    bodyColor: "text-text/65",
    labelColor: "text-accent-2",
  },
  {
    title: "AUTOMATIZAR",
    subtitle: "Deixe o trabalho repetitivo acontecer sozinho.",
    body: "Para substituir atividades manuais e repetitivas por fluxos que executam tarefas de forma rápida, padronizada e rastreável, reduzindo o trabalho operacional e permitindo que as pessoas concentrem seu tempo no que realmente precisa de atenção.",
    complement:
      "Processos que dependem de copiar informações, enviar mensagens, organizar pedidos, atualizar planilhas, consultar sistemas ou repetir as mesmas etapas todos os dias podem ser transformados em fluxos automáticos.",
    examples:
      "Pedidos de restaurantes, atualização de informações, organização de dados, envio de mensagens, integrações entre sistemas e rotinas administrativas.",
    surface: "bg-[#45238A]",
    side: "right",
    headingColor: "text-text",
    subColor: "text-text/80",
    dividerColor: "border-text/20",
    bodyColor: "text-text/70",
    labelColor: "text-text/70",
  },
  {
    title: "CRIAR",
    subtitle: "Transforme uma necessidade ou ideia em um produto digital.",
    body: "Para transformar uma necessidade, oportunidade ou ideia em um software próprio, desenvolvido de acordo com a realidade do negócio e preparado para evoluir conforme novos processos, clientes e possibilidades surgem.",
    complement:
      "Uma solução pode começar pequena, resolver um problema específico e crescer com o tempo, tornando-se uma ferramenta interna, uma plataforma para clientes ou até mesmo um novo produto digital.",
    examples:
      "Sistemas próprios, plataformas web, ferramentas internas, produtos digitais, SaaS e MicroSaaS.",
    surface: "bg-[#0B0B10]",
    side: "left",
    headingColor: "text-text",
    subColor: "text-text/80",
    dividerColor: "border-text/15",
    bodyColor: "text-text/65",
    labelColor: "text-accent-2",
  },
];

export function Process() {
  const stageRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(prefers-reduced-motion: no-preference)": () => {
          const els = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);

          // Cada card percorre a mesma trajetória (entra por baixo, cruza o
          // stage congelado, sai por cima) num segmento de 1 unidade de
          // scroll; o segmento seguinte começa 0.4 unidade antes do
          // anterior terminar, criando a sobreposição pedida (card N ainda
          // saindo enquanto card N+1 já está entrando). O fundo nunca é
          // tocado — só os cards têm transform animado.
          const segmentDuration = 1;
          const overlap = 0.4;
          const totalUnits = segmentDuration * els.length - overlap * (els.length - 1);

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: stageRef.current,
              start: "top top",
              end: () => `+=${window.innerHeight * totalUnits}`,
              scrub: true,
              pin: true,
            },
          });

          // Cada card se move em velocidade constante pela timeline INTEIRA
          // (não só no seu próprio segmento) — antes/depois da sua janela
          // de travessia ele continua deslocando fora da tela, na mesma
          // reta. Isso evita qualquer "congelamento": em todo instante do
          // scroll, todo card está se movendo, mesmo quando invisível.
          const rate = -280 / segmentDuration;
          els.forEach((el, index) => {
            const position = index * (segmentDuration - overlap);
            const startY = 140 - rate * position;
            const endY = startY + rate * totalUnits;
            timeline.fromTo(
              el,
              { yPercent: startY },
              { yPercent: endY, ease: "none", duration: totalUnits },
              0,
            );
          });
        },
      });
    }, stageRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={stageRef}
      className="relative bg-bg text-text motion-safe:h-screen motion-safe:overflow-hidden"
    >
      {/* Fundo congelado — não recebe nenhuma animação; permanece parado
          enquanto os cards atravessam a composição por cima dele. Sob
          prefers-reduced-motion cai para um título normal no topo do
          fluxo (sem overlay/pin), já que a mecânica de scroll é desativada. */}
      <div className="relative z-0 flex items-center justify-center px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24 motion-safe:absolute motion-safe:inset-0 motion-safe:py-0">
        <p className="max-w-3xl text-center text-[clamp(1.75rem,5.5vw,3.75rem)] font-bold uppercase leading-[1.08] tracking-[-0.01em]">
          Tecnologia para resolver o que hoje dá trabalho.
        </p>
      </div>

      {cards.map((card, index) => (
        <div
          key={card.title}
          ref={(el) => {
            cardRefs.current[index] = el;
          }}
          className={`relative z-10 mt-8 flex w-full flex-col justify-start px-5 py-8 first:mt-0 sm:px-7 sm:py-9 lg:px-8 lg:py-10 motion-safe:absolute motion-safe:inset-x-0 motion-safe:top-[14vh] motion-safe:mx-auto motion-safe:mt-0 motion-safe:w-[88%] sm:motion-safe:w-[64%] ${
            card.side === "left"
              ? "lg:motion-safe:left-[6%] lg:motion-safe:right-auto lg:motion-safe:mx-0 lg:motion-safe:w-[38%]"
              : "lg:motion-safe:right-[6%] lg:motion-safe:left-auto lg:motion-safe:mx-0 lg:motion-safe:w-[38%]"
          } ${card.surface}`}
          style={{ zIndex: index + 1 }}
        >
          <p
            className={`text-3xl font-bold uppercase leading-[0.95] tracking-[-0.01em] sm:text-4xl lg:text-[2.75rem] ${card.headingColor}`}
          >
            {card.title}
          </p>
          <p
            className={`mt-3 text-lg leading-snug sm:text-xl lg:mt-4 lg:text-2xl ${card.subColor}`}
          >
            {card.subtitle}
          </p>

          <div className={`mt-5 border-t lg:mt-6 ${card.dividerColor}`} />

          <div className="mt-5 flex flex-col gap-4 lg:mt-6 lg:gap-5">
            <p className={`text-sm leading-relaxed sm:text-base lg:text-base ${card.bodyColor}`}>
              {card.body}
            </p>
            <p className={`text-sm leading-relaxed sm:text-base lg:text-base ${card.bodyColor}`}>
              {card.complement}
            </p>
            <div>
              <p
                className={`text-xs font-semibold uppercase tracking-[0.12em] sm:text-sm lg:text-lg ${card.labelColor}`}
              >
                Exemplos de aplicação
              </p>
              <p
                className={`mt-2 text-sm leading-relaxed sm:text-base lg:text-base ${card.bodyColor}`}
              >
                {card.examples}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
