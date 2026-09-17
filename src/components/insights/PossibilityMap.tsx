"use client";

import { useEffect, useRef, useState } from "react";
import { StaggerReveal } from "@/components/insights/StaggerReveal";

type MapNode = {
  id: string;
  label: string;
  description: string;
};

const NODES: MapNode[] = [
  {
    id: "pedidos",
    label: "Pedidos",
    description: "Receber, validar, distribuir, acompanhar e atualizar automaticamente.",
  },
  {
    id: "atendimento",
    label: "Atendimento",
    description: "Centralizar solicitações e transformar cada atendimento em uma etapa rastreável.",
  },
  {
    id: "operacoes",
    label: "Operações",
    description: "Transformar rotinas repetitivas em processos executáveis.",
  },
  {
    id: "gestao",
    label: "Gestão",
    description: "Consolidar informações de diferentes áreas.",
  },
  {
    id: "acompanhamento",
    label: "Acompanhamento",
    description: "Saber o que aconteceu, quem fez, quando e qual é o próximo passo.",
  },
  {
    id: "produto",
    label: "Produtos internos",
    description: "Construir uma ferramenta quando as soluções existentes não refletem a realidade da empresa.",
  },
];

const [PEDIDOS, ATENDIMENTO, OPERACOES, GESTAO, ACOMPANHAMENTO, PRODUTO] = [0, 1, 2, 3, 4, 5];

// Mapa de possibilidades: Pedidos (raiz) se ramifica em três frentes
// operacionais (Atendimento / Operações / Gestão), que convergem em
// Acompanhamento e seguem para Produtos internos. Cada nó é um painel com
// borda fina e a descrição sempre visível (não depende de hover para ser
// lida — só a hierarquia de conexões usa o estado de interação). Purple
// aparece apenas nos trechos de linha relacionados ao nó ativo.
export function PossibilityMap() {
  const [active, setActive] = useState(PEDIDOS);
  const [interacted, setInteracted] = useState(false);
  const hoverTimeout = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (hoverTimeout.current) window.clearTimeout(hoverTimeout.current);
    };
  }, []);

  function select(index: number) {
    setInteracted(true);
    setActive(index);
  }

  function scheduleHover(index: number) {
    if (hoverTimeout.current) window.clearTimeout(hoverTimeout.current);
    hoverTimeout.current = window.setTimeout(() => select(index), 180);
  }

  function cancelHover() {
    if (hoverTimeout.current) {
      window.clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
  }

  const nodeProps = { active, interacted, onSelect: select, onHover: scheduleHover, onLeave: cancelHover };

  return (
    <StaggerReveal className="mt-12">
      {[
        <div key="composition">
          {/* Desktop / tablet — ramificação */}
          <div className="hidden sm:block">
            <div className="grid grid-cols-3 gap-x-6">
              <div className="col-span-3 flex justify-center pb-4">
                <Node index={PEDIDOS} node={NODES[PEDIDOS]} {...nodeProps} />
              </div>

              <SplitConnector active={active} />

              <div className="flex justify-center pt-4">
                <Node index={ATENDIMENTO} node={NODES[ATENDIMENTO]} {...nodeProps} />
              </div>
              <div className="flex justify-center pt-4">
                <Node index={OPERACOES} node={NODES[OPERACOES]} {...nodeProps} />
              </div>
              <div className="flex justify-center pt-4">
                <Node index={GESTAO} node={NODES[GESTAO]} {...nodeProps} />
              </div>

              <MergeConnector active={active} />

              <div className="col-span-3 flex justify-center py-4">
                <Node index={ACOMPANHAMENTO} node={NODES[ACOMPANHAMENTO]} {...nodeProps} />
              </div>

              <StraightConnector
                highlight={active === ACOMPANHAMENTO || active === PRODUTO}
                className="col-span-3"
              />

              <div className="col-span-3 flex justify-center pt-4">
                <Node index={PRODUTO} node={NODES[PRODUTO]} {...nodeProps} />
              </div>
            </div>
          </div>

          {/* Mobile — sequência vertical */}
          <div className="flex flex-col items-center sm:hidden">
            {NODES.map((node, index) => (
              <div key={node.id} className="flex w-full flex-col items-center">
                {index > 0 && (
                  <StraightConnector
                    highlight={active === index || active === index - 1}
                    short
                  />
                )}
                <div className="w-full py-2">
                  <Node index={index} node={node} {...nodeProps} />
                </div>
              </div>
            ))}
          </div>
        </div>,
      ]}
    </StaggerReveal>
  );
}

function Node({
  index,
  node,
  active,
  interacted,
  onSelect,
  onHover,
  onLeave,
}: {
  index: number;
  node: MapNode;
  active: number;
  interacted: boolean;
  onSelect: (index: number) => void;
  onHover: (index: number) => void;
  onLeave: () => void;
}) {
  const isActive = active === index;
  const dimmed = interacted && !isActive;

  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      onFocus={() => onSelect(index)}
      className={`w-full max-w-[15rem] border bg-surface p-4 text-left outline-none transition-all duration-300 sm:max-w-[13rem] ${
        isActive ? "border-accent/50" : "border-divider"
      } ${dimmed ? "opacity-55" : "opacity-100"}`}
    >
      <div className="flex items-center gap-2">
        <Glyph id={node.id} isActive={isActive} />
        <span
          className={`text-xs font-bold uppercase tracking-[0.1em] transition-colors duration-200 ${
            isActive ? "text-accent" : "text-text"
          }`}
        >
          {node.label}
        </span>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-text/65">{node.description}</p>
    </button>
  );
}

function Glyph({ id, isActive }: { id: string; isActive: boolean }) {
  const cls = `h-4 w-4 shrink-0 transition-colors duration-200 ${isActive ? "text-accent" : "text-text/45"}`;
  switch (id) {
    case "pedidos":
      return (
        <svg viewBox="0 0 16 16" className={cls} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="1.5" y="6.5" width="3" height="3" />
          <rect x="6.5" y="6.5" width="3" height="3" />
          <rect x="11.5" y="6.5" width="3" height="3" />
          <path d="M4.5 8h2M9.5 8h2" />
        </svg>
      );
    case "atendimento":
      return (
        <svg viewBox="0 0 16 16" className={cls} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="3" cy="8" r="1.8" />
          <circle cx="13" cy="8" r="1.8" />
          <path d="M4.8 8h6.4" />
        </svg>
      );
    case "operacoes":
      return (
        <svg viewBox="0 0 16 16" className={cls} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="2" y="4" width="12" height="8" />
          <path d="M2 8h12M8 4v8" />
        </svg>
      );
    case "gestao":
      return (
        <svg viewBox="0 0 16 16" className={cls} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M8 3.2 13 12H3Z" />
        </svg>
      );
    case "acompanhamento":
      return (
        <svg viewBox="0 0 16 16" className={cls} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M1.5 8h13" />
          <circle cx="8" cy="8" r="1.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "produto":
      return (
        <svg viewBox="0 0 16 16" className={cls} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="2.5" y="3" width="11" height="10" />
          <path d="M5.5 6.5h5M5.5 9h5" />
        </svg>
      );
    default:
      return null;
  }
}

function SplitConnector({ active }: { active: number }) {
  const rootHighlight = active === PEDIDOS;
  const leftHighlight = active === PEDIDOS || active === ATENDIMENTO;
  const centerHighlight = active === PEDIDOS || active === OPERACOES;
  const rightHighlight = active === PEDIDOS || active === GESTAO;
  const line = (on: boolean) => (on ? "bg-accent/70" : "bg-divider");

  return (
    <div className="relative col-span-3 h-10" aria-hidden="true">
      <div className={`absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 transition-colors duration-300 ${line(rootHighlight)}`} />
      <div className="absolute left-[16.667%] right-[16.667%] top-5 h-px bg-divider" />
      <div className={`absolute left-[16.667%] top-5 h-5 w-px transition-colors duration-300 ${line(leftHighlight)}`} />
      <div className={`absolute left-1/2 top-5 h-5 w-px -translate-x-1/2 transition-colors duration-300 ${line(centerHighlight)}`} />
      <div className={`absolute right-[16.667%] top-5 h-5 w-px transition-colors duration-300 ${line(rightHighlight)}`} />
    </div>
  );
}

function MergeConnector({ active }: { active: number }) {
  const leftHighlight = active === ATENDIMENTO || active === ACOMPANHAMENTO;
  const centerHighlight = active === OPERACOES || active === ACOMPANHAMENTO;
  const rightHighlight = active === GESTAO || active === ACOMPANHAMENTO;
  const stemHighlight = active === ACOMPANHAMENTO;
  const line = (on: boolean) => (on ? "bg-accent/70" : "bg-divider");

  return (
    <div className="relative col-span-3 h-10" aria-hidden="true">
      <div className={`absolute left-[16.667%] top-0 h-5 w-px transition-colors duration-300 ${line(leftHighlight)}`} />
      <div className={`absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 transition-colors duration-300 ${line(centerHighlight)}`} />
      <div className={`absolute right-[16.667%] top-0 h-5 w-px transition-colors duration-300 ${line(rightHighlight)}`} />
      <div className="absolute left-[16.667%] right-[16.667%] top-5 h-px bg-divider" />
      <div className={`absolute left-1/2 top-5 h-5 w-px -translate-x-1/2 transition-colors duration-300 ${line(stemHighlight)}`} />
    </div>
  );
}

function StraightConnector({
  highlight,
  className = "",
  short = false,
}: {
  highlight: boolean;
  className?: string;
  short?: boolean;
}) {
  return (
    <div className={`flex justify-center ${short ? "h-6" : "h-10"} ${className}`} aria-hidden="true">
      <div className={`h-full w-px transition-colors duration-300 ${highlight ? "bg-accent/70" : "bg-divider"}`} />
    </div>
  );
}
