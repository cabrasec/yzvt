"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Card = {
  key: "comunicar" | "automatizar" | "criar";
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
    key: "comunicar",
    surface: "bg-background-dark",
    side: "left",
    headingColor: "text-text",
    subColor: "text-text/80",
    dividerColor: "border-text/15",
    bodyColor: "text-text/65",
    labelColor: "text-accent-2",
  },
  {
    key: "automatizar",
    surface: "bg-accent-dark",
    side: "right",
    headingColor: "text-text",
    subColor: "text-text/80",
    dividerColor: "border-text/20",
    bodyColor: "text-text/70",
    labelColor: "text-text/70",
  },
  {
    key: "criar",
    surface: "bg-background-dark",
    side: "left",
    headingColor: "text-text",
    subColor: "text-text/80",
    dividerColor: "border-text/15",
    bodyColor: "text-text/65",
    labelColor: "text-accent-2",
  },
];

export function Process() {
  const t = useTranslations("Process");
  const stageRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(prefers-reduced-motion: no-preference)": () => {
          const els = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);

          // Cada card percorre a mesma trajetória (entra por baixo, cruza o
          // stage congelado, sai por cima) num segmento de 0.85 unidade de
          // scroll; o segmento seguinte começa 0.38 unidade antes do
          // anterior terminar — o próximo card começa a subir um pouco mais
          // cedo (antes o gatilho era em ~65% do trajeto do card atual,
          // agora é em ~55%), reduzindo a sensação de intervalo morto sem
          // voltar a fazer os dois competirem pela leitura. A distância de
          // deslocamento (140% -> 125%) segue reduzida, só o suficiente
          // para sair completamente da área visível. O fundo nunca é
          // tocado — só os cards têm transform animado.
          const travelPercent = 125;
          const segmentDuration = 0.85;
          const overlap = 0.38;
          const totalUnits = segmentDuration * els.length - overlap * (els.length - 1);

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: stageRef.current,
              start: "top top",
              end: () => `+=${window.innerHeight * totalUnits}`,
              scrub: true,
              pin: true,
              // O pin padrão do GSAP reserva altura própria da section
              // (h-screen) + distância de scroll da animação no spacer que
              // ele mesmo cria — depois que o pin solta, essa altura própria
              // sobra como um trecho morto extra (quase 1 viewport) antes da
              // Section 04, com a frase já sem pin "arrastando" por cima do
              // Header nesse meio-tempo. Em vez de reestruturar o pin em si
              // (arriscado — GSAP trata `pin` e `trigger` em elementos
              // diferentes de forma frágil), corrigimos na origem exata do
              // excesso: depois que o spacer é criado, encolhemos ele para
              // conter SÓ a distância de scroll da animação, sem a sobra da
              // altura natural da section. Nada da animação dos cards muda.
              onRefresh: () => {
                const spacer = stageRef.current?.parentElement;
                if (spacer?.classList.contains("pin-spacer")) {
                  spacer.style.height = `${window.innerHeight * totalUnits}px`;
                }
              },
            },
          });

          // Cada card se move em velocidade constante pela timeline INTEIRA
          // (não só no seu próprio segmento) — antes/depois da sua janela
          // de travessia ele continua deslocando fora da tela, na mesma
          // reta. Isso evita qualquer "congelamento": em todo instante do
          // scroll, todo card está se movendo, mesmo quando invisível.
          const rate = (-2 * travelPercent) / segmentDuration;
          els.forEach((el, index) => {
            const position = index * (segmentDuration - overlap);
            const startY = travelPercent - rate * position;
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
          {t("heading")}
        </p>
      </div>

      {cards.map((card, index) => (
        <div
          key={card.key}
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
            {t(`cards.${card.key}.title`)}
          </p>
          <p
            className={`mt-3 text-lg leading-snug sm:text-xl lg:mt-4 lg:text-2xl ${card.subColor}`}
          >
            {t(`cards.${card.key}.subtitle`)}
          </p>

          <div className={`mt-5 border-t lg:mt-6 ${card.dividerColor}`} />

          <div className="mt-5 flex flex-col gap-4 lg:mt-6 lg:gap-5">
            <p className={`text-sm leading-relaxed sm:text-base lg:text-base ${card.bodyColor}`}>
              {t(`cards.${card.key}.body`)}
            </p>
            <p className={`text-sm leading-relaxed sm:text-base lg:text-base ${card.bodyColor}`}>
              {t(`cards.${card.key}.complement`)}
            </p>
            <div>
              <p
                className={`text-xs font-semibold uppercase tracking-[0.12em] sm:text-sm lg:text-lg ${card.labelColor}`}
              >
                {t("applicationExamplesLabel")}
              </p>
              <p
                className={`mt-2 text-sm leading-relaxed sm:text-base lg:text-base ${card.bodyColor}`}
              >
                {t(`cards.${card.key}.examples`)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
