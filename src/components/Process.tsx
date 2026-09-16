"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Entry = {
  heading: string;
  text: string;
};

type Card = {
  number: string;
  phraseTop: string;
  phraseBottom: string;
  entries: Entry[];
  surface: string;
  side: "left" | "right";
  numberColor: string;
  headingColor: string;
  subColor: string;
  dividerColor: string;
  bodyColor: string;
};

const cards: Card[] = [
  {
    number: "01",
    phraseTop: "AUTOMATIZE",
    phraseBottom: "o que toma seu tempo.",
    surface: "bg-[#0B0B10]",
    side: "left",
    numberColor: "text-accent-2",
    headingColor: "text-text",
    subColor: "text-text/80",
    dividerColor: "border-text/15",
    bodyColor: "text-text/65",
    entries: [
      {
        heading: "WhatsApp que responde sozinho",
        text: "Receba mensagens de clientes, tire dúvidas, envie informações, confirme pedidos e encaminhe cada atendimento sem precisar responder tudo manualmente.",
      },
      {
        heading: "Pedidos pelo WhatsApp e Instagram",
        text: "Receba pedidos diretamente pelos canais que seus clientes já usam. As informações podem ser organizadas e encaminhadas automaticamente para quem precisa atender ou preparar o pedido.",
      },
      {
        heading: "Pedidos de restaurantes",
        text: "Cardápio, pedido, confirmação e atualização do cliente em um fluxo simples, sem precisar copiar informações de uma conversa para outra.",
      },
      {
        heading: "Tarefas que se repetem todos os dias",
        text: "Envio de mensagens, avisos, atualização de informações, preenchimento de dados e outras tarefas repetitivas podem acontecer automaticamente.",
      },
    ],
  },
  {
    number: "02",
    phraseTop: "CRIE",
    phraseBottom: "o que sua empresa precisa.",
    surface: "bg-[#45238A]",
    side: "right",
    numberColor: "text-text/60",
    headingColor: "text-text",
    subColor: "text-text/80",
    dividerColor: "border-text/20",
    bodyColor: "text-text/70",
    entries: [
      {
        heading: "Um sistema para o seu negócio",
        text: "Se sua empresa ainda controla informações por planilhas, mensagens ou anotações, podemos transformar esse processo em um sistema simples, feito para a sua rotina.",
      },
      {
        heading: "Site que trabalha pelo seu negócio",
        text: "Mais do que uma página bonita: um site pode apresentar seus serviços, mostrar produtos, receber contatos, gerar pedidos e facilitar o atendimento.",
      },
      {
        heading: "Uma aplicação para sua operação",
        text: "Crie uma ferramenta para organizar pedidos, clientes, produtos, serviços, agendamentos ou qualquer outra parte do negócio.",
      },
      {
        heading: "Faça suas ferramentas conversarem",
        text: "WhatsApp, site, planilhas e outros sistemas podem trocar informações automaticamente, evitando trabalho duplicado e a necessidade de copiar e colar dados.",
      },
    ],
  },
  {
    number: "03",
    phraseTop: "TRANSFORME",
    phraseBottom: "uma ideia em produto.",
    surface: "bg-[#0B0B10]",
    side: "left",
    numberColor: "text-accent-2",
    headingColor: "text-text",
    subColor: "text-text/80",
    dividerColor: "border-text/15",
    bodyColor: "text-text/65",
    entries: [
      {
        heading: "Tire sua ideia do papel",
        text: "Transforme uma ideia em uma primeira versão funcionando, coloque para testar e descubra o que realmente faz sentido antes de investir em algo maior.",
      },
      {
        heading: "Crie seu próprio software",
        text: "Se existe um problema que pode ser resolvido por tecnologia, sua empresa pode transformar essa solução em um produto próprio.",
      },
      {
        heading: "SaaS e MicroSaaS",
        text: "Crie um software que outras empresas ou pessoas possam usar pela internet, com uma estrutura preparada para crescer.",
      },
      {
        heading: "Automação dentro do produto",
        text: "Seu software também pode executar tarefas, enviar mensagens, organizar informações e usar inteligência artificial quando isso realmente facilitar a experiência.",
      },
    ],
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
          key={card.number}
          ref={(el) => {
            cardRefs.current[index] = el;
          }}
          className={`relative z-10 mt-8 flex w-full flex-col justify-start px-5 py-8 first:mt-0 sm:px-7 sm:py-9 lg:px-7 lg:py-9 motion-safe:absolute motion-safe:inset-x-0 motion-safe:top-[14vh] motion-safe:mx-auto motion-safe:mt-0 motion-safe:w-[88%] sm:motion-safe:w-[64%] ${
            card.side === "left"
              ? "lg:motion-safe:left-[6%] lg:motion-safe:right-auto lg:motion-safe:mx-0 lg:motion-safe:w-[38%]"
              : "lg:motion-safe:right-[6%] lg:motion-safe:left-auto lg:motion-safe:mx-0 lg:motion-safe:w-[38%]"
          } ${card.surface}`}
          style={{ zIndex: index + 1 }}
        >
          <span className={`block text-xs tracking-[0.3em] ${card.numberColor}`}>
            {card.number}
          </span>
          <p
            className={`mt-3 text-2xl font-bold uppercase leading-[0.95] tracking-[-0.01em] sm:text-3xl lg:text-[1.85rem] ${card.headingColor}`}
          >
            {card.phraseTop}
          </p>
          <p
            className={`mt-1 text-base font-medium leading-[1.15] sm:text-lg lg:text-lg ${card.subColor}`}
          >
            {card.phraseBottom}
          </p>

          <div className={`mt-4 border-t lg:mt-5 ${card.dividerColor}`} />

          <div className="mt-4 flex flex-col gap-3 lg:mt-5 lg:gap-3.5">
            {card.entries.map((entry) => (
              <div key={entry.heading}>
                <p className={`text-sm font-semibold leading-snug ${card.headingColor}`}>
                  {entry.heading}
                </p>
                <p className={`mt-1 text-xs leading-relaxed sm:text-[0.8rem] ${card.bodyColor}`}>
                  {entry.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
