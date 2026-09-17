"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { StaggerReveal } from "@/components/insights/StaggerReveal";
import { OperationBlueprint } from "@/components/insights/OperationBlueprint";

// Sequência de construção do diagrama (fase 3): entrada -> processo -> áreas
// -> saída, disparada uma única vez via IntersectionObserver quando o
// diagrama entra na viewport. Mesma técnica já usada no blueprint da fase 1
// (opacity + translateY nos nós, scaleY nas linhas — não altera layout).
// Ao final, um único pulso roxo percorre o caminho e o diagrama fica estático.
const DELAY = {
  pedido: 0,
  lineToProcesso: 180,
  processo: 400,
  splitLine: 620,
  mergeLine: 1050,
  indicadores: 1280,
} as const;

const BRANCHES = [
  { label: "Cliente", delayMs: 820 },
  { label: "Estoque", delayMs: 860 },
  { label: "Financeiro", delayMs: 900 },
] as const;

const PULSE_AT = { pedido: 1600, processo: 1780, areas: 1960, indicadores: 2140, done: 2320 } as const;

function usePhase3Reveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);
  const [pulseStage, setPulseStage] = useState<0 | 1 | 2 | 3 | 4>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const timers: number[] = [];

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setActive(true);
        observer.disconnect();

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion) return;

        const schedule = (stage: 0 | 1 | 2 | 3 | 4, delayMs: number) => {
          timers.push(window.setTimeout(() => setPulseStage(stage), delayMs));
        };
        schedule(1, PULSE_AT.pedido);
        schedule(2, PULSE_AT.processo);
        schedule(3, PULSE_AT.areas);
        schedule(4, PULSE_AT.indicadores);
        schedule(0, PULSE_AT.done);
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return { ref, active, pulseStage };
}

function NodeReveal({ delayMs, active, children }: { delayMs: number; active: boolean; children: ReactNode }) {
  return (
    <div
      style={{ transitionDelay: active ? `${delayMs}ms` : "0ms" }}
      className={`transition-all duration-300 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
        active ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

function LineReveal({
  delayMs,
  active,
  className = "",
  children,
}: {
  delayMs: number;
  active: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{ transitionDelay: active ? `${delayMs}ms` : "0ms" }}
      className={`origin-top transition-all duration-300 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:scale-y-100 ${
        active ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Pequena seta de direção — mesma linguagem do OperationBlueprint (fase 1):
// cada linha representa uma relação, não um traço decorativo.
function ArrowDown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 8 5" className={`h-[5px] w-2 ${className}`} aria-hidden="true" fill="currentColor">
      <path d="M0 0 4 5 8 0Z" />
    </svg>
  );
}

function StraightArrow({ delayMs, active, className = "" }: { delayMs: number; active: boolean; className?: string }) {
  return (
    <LineReveal delayMs={delayMs} active={active} className={`relative flex h-10 justify-center ${className}`}>
      <div aria-hidden="true" className="h-full w-px bg-divider" />
      <ArrowDown className="absolute bottom-0 left-1/2 -translate-x-1/2 text-divider" />
    </LineReveal>
  );
}

// Processo se distribui em três frentes da mesma operação (não três serviços
// soltos) e volta a convergir em Indicadores — mesmo recurso visual do
// blueprint da fase 1 (grid de 3 colunas + linhas em "cotovelo"), adaptado
// para um split/merge de 3 vias.
function TridentSplit({ delayMs, active }: { delayMs: number; active: boolean }) {
  return (
    <LineReveal delayMs={delayMs} active={active} className="relative col-span-3 h-10">
      <div className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-divider" />
      <div className="absolute left-[16.667%] right-[16.667%] top-5 h-px bg-divider" />
      <div className="absolute left-[16.667%] top-5 h-5 w-px bg-divider" />
      <div className="absolute left-1/2 top-5 h-5 w-px -translate-x-1/2 bg-divider" />
      <div className="absolute right-[16.667%] top-5 h-5 w-px bg-divider" />
      <ArrowDown className="absolute bottom-0 left-[16.667%] -translate-x-1/2 text-divider" />
      <ArrowDown className="absolute bottom-0 left-1/2 -translate-x-1/2 text-divider" />
      <ArrowDown className="absolute bottom-0 right-[16.667%] translate-x-1/2 text-divider" />
      <div className="absolute left-1/2 top-5 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-divider" />
    </LineReveal>
  );
}

function TridentMerge({ delayMs, active }: { delayMs: number; active: boolean }) {
  return (
    <LineReveal delayMs={delayMs} active={active} className="relative col-span-3 h-10">
      <div className="absolute left-[16.667%] top-0 h-5 w-px bg-divider" />
      <div className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-divider" />
      <div className="absolute right-[16.667%] top-0 h-5 w-px bg-divider" />
      <div className="absolute left-[16.667%] right-[16.667%] top-5 h-px bg-divider" />
      <div className="absolute left-1/2 top-5 h-5 w-px -translate-x-1/2 bg-accent/60" />
      <ArrowDown className="absolute bottom-0 left-1/2 -translate-x-1/2 text-accent/70" />
      <div className="absolute left-1/2 top-5 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/70" />
    </LineReveal>
  );
}

// Três papéis, três pesos visuais: Pedido é só uma entrada (marcador roxo
// discreto), Processo é a estrutura central (única caixa com ênfase forte),
// Indicadores é a saída consolidada (ênfase roxa, porém mais leve que o
// núcleo). Cliente/Estoque/Financeiro ficam neutros e no mesmo nível.
// `pulsing` é o único pulso de fluxo pós-construção (uma vez, some sozinho).
function StructNode({
  label,
  kind,
  tag,
  pulsing = false,
}: {
  label: string;
  kind: "input" | "core" | "branch" | "output";
  tag?: string;
  pulsing?: boolean;
}) {
  return (
    <div className="inline-flex flex-col items-center gap-1.5">
      {kind === "core" ? (
        <span
          className={`inline-block border-2 border-accent px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-accent transition-colors duration-300 motion-reduce:transition-none ${
            pulsing ? "bg-accent/10" : "bg-transparent"
          }`}
        >
          {label}
        </span>
      ) : (
        <span
          className={`relative inline-block border px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition-colors duration-300 motion-reduce:transition-none ${
            kind === "output" ? "border-accent/60 text-accent" : "border-divider text-text/75"
          } ${pulsing ? "bg-accent/10" : "bg-transparent"}`}
        >
          {kind === "input" && (
            <span
              aria-hidden="true"
              className="absolute -left-1.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent"
            />
          )}
          {label}
        </span>
      )}
      {tag && (
        <span aria-hidden="true" className="font-mono text-[9px] uppercase tracking-[0.08em] text-text/35">
          {tag}
        </span>
      )}
    </div>
  );
}

// A experiência central do artigo: três fases reveladas em sequência
// (IntersectionObserver via StaggerReveal, já existente — sem GSAP, sem
// travar o scroll). Fase 1 mostra o fluxo fragmentado de uma operação presa
// à planilha; Fase 2 é a ruptura editorial; Fase 3 mostra o mesmo fluxo
// reorganizado como processo. Tudo em HTML/CSS puro (bordas finas, linhas,
// grid) — sem ícones, sem ilustração, sem gradiente.
export function ProcessFlow() {
  const { ref: phase3Ref, active: phase3Active, pulseStage } = usePhase3Reveal<HTMLDivElement>();

  return (
    <StaggerReveal staggerMs={280} className="space-y-20 sm:space-y-24">
      {/* Fase 1 — Planilha: fluxo fragmentado */}
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-text/65">
          Como a operação funciona hoje
        </p>
        <p className="mt-3 max-w-md text-xs text-text/55">
          O problema começa quando um processo simples passa a depender de várias
          etapas, ferramentas e pessoas.
        </p>
        <div className="mt-8">
          <OperationBlueprint />
        </div>
      </div>

      {/* Fase 2 — Ponto de virada: ruptura editorial */}
      <div className="border-t border-accent/40 py-4 text-center sm:py-6">
        <p className="mx-auto max-w-xl text-2xl font-bold leading-snug tracking-[-0.01em] sm:text-3xl">
          O problema não é a planilha.
        </p>
        <p className="mx-auto mt-3 max-w-xl text-2xl font-bold leading-snug tracking-[-0.01em] text-text/50 sm:text-3xl">
          É quando o processo passa a depender dela.
        </p>
      </div>

      {/* Fase 3 — Processo estruturado */}
      <div ref={phase3Ref} className="mt-16! sm:mt-20!">
        <p className="text-xs uppercase tracking-[0.2em] text-text/65">
          Como a mesma operação pode ser estruturada
        </p>
        <div className="mt-8 grid grid-cols-3">
          <div className="col-span-3 flex justify-center pb-2">
            <NodeReveal delayMs={DELAY.pedido} active={phase3Active}>
              <StructNode kind="input" tag="INPUT" label="Pedido" pulsing={pulseStage === 1} />
            </NodeReveal>
          </div>

          <StraightArrow delayMs={DELAY.lineToProcesso} active={phase3Active} className="col-span-3" />

          <div className="col-span-3 flex justify-center py-2">
            <NodeReveal delayMs={DELAY.processo} active={phase3Active}>
              <StructNode kind="core" tag="CORE" label="Processo" pulsing={pulseStage === 2} />
            </NodeReveal>
          </div>

          <TridentSplit delayMs={DELAY.splitLine} active={phase3Active} />

          {BRANCHES.map((branch) => (
            <div key={branch.label} className="flex justify-center pt-2">
              <NodeReveal delayMs={branch.delayMs} active={phase3Active}>
                <StructNode kind="branch" label={branch.label} pulsing={pulseStage === 3} />
              </NodeReveal>
            </div>
          ))}

          <TridentMerge delayMs={DELAY.mergeLine} active={phase3Active} />

          <div className="col-span-3 flex justify-center pt-2">
            <NodeReveal delayMs={DELAY.indicadores} active={phase3Active}>
              <StructNode kind="output" tag="OUTPUT" label="Indicadores" pulsing={pulseStage === 4} />
            </NodeReveal>
          </div>
        </div>

        {/* pausa editorial antes da próxima ideia */}
        <div aria-hidden="true" className="relative mt-10 flex justify-center">
          <div className="h-8 w-px bg-accent/40" />
          <ArrowDown className="absolute bottom-0 left-1/2 -translate-x-1/2 text-accent/60" />
        </div>
      </div>
    </StaggerReveal>
  );
}
