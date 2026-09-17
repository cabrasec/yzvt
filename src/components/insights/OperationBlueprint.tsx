"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type NodeKind = "input" | "document" | "channel" | "manual" | "output";

type BlueprintNode = {
  id: string;
  label: string;
  kind: NodeKind;
  tag?: string;
  detail: string;
};

const NODES = {
  pedido: { id: "01", label: "Pedido", kind: "input", tag: "INPUT", detail: "Entrada" },
  planilha: { id: "02", label: "Planilha", kind: "document", detail: "Informação" },
  whatsapp: { id: "03", label: "WhatsApp", kind: "channel", detail: "Comunicação" },
  email: { id: "04", label: "E-mail", kind: "channel", detail: "Registro" },
  outraPlanilha: { id: "05", label: "Outra planilha", kind: "document", detail: "Duplicação" },
  responsavel: { id: "06", label: "Responsável", kind: "manual", tag: "MANUAL STEP", detail: "Intervenção manual" },
  relatorio: { id: "07", label: "Relatório", kind: "output", tag: "OUTPUT", detail: "Decisão" },
} satisfies Record<string, BlueprintNode>;

// Diagrama "blueprint" da operação presa à planilha — substitui a antiga
// lista vertical simples pela mesma ideia, mas como arquitetura técnica:
// um ponto de entrada que se fragmenta em ferramentas paralelas e converge
// de volta em um relatório manual. Revelação sequencial via
// IntersectionObserver (uma vez só), respeitando prefers-reduced-motion.
function useSequentialReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, active };
}

const STEP_MS = 70;

function Reveal({
  step,
  active,
  className = "",
  children,
}: {
  step: number;
  active: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{ transitionDelay: active ? `${step * STEP_MS}ms` : "0ms" }}
      className={`transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
        active ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function ConnectorReveal({
  step,
  active,
  className = "",
  children,
}: {
  step: number;
  active: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{ transitionDelay: active ? `${step * STEP_MS}ms` : "0ms" }}
      className={`origin-top transition-all duration-400 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:scale-y-100 ${
        active ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Pequena seta de direção — reforça que cada linha representa uma relação
// (A alimenta B), não um traço decorativo entre elementos soltos.
function ArrowDown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 8 5" className={`h-[5px] w-2 ${className}`} aria-hidden="true" fill="currentColor">
      <path d="M0 0 4 5 8 0Z" />
    </svg>
  );
}

function NodeGlyph({ kind }: { kind: NodeKind }) {
  const cls = "h-3.5 w-3.5 shrink-0 text-text/45";
  switch (kind) {
    case "input":
      return (
        <svg viewBox="0 0 16 16" className={cls} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M2 8h9M7.5 4.5 11 8l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "document":
      return (
        <svg viewBox="0 0 16 16" className={cls} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="3" y="2.5" width="10" height="11" />
          <path d="M5.5 6h5M5.5 8.5h5M5.5 11h3" strokeLinecap="round" />
        </svg>
      );
    case "channel":
      return (
        <svg viewBox="0 0 16 16" className={cls} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="4" cy="8" r="1.6" />
          <circle cx="12" cy="8" r="1.6" />
          <path d="M5.6 8h4.8" />
        </svg>
      );
    case "manual":
      return (
        <svg viewBox="0 0 16 16" className={cls} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="8" cy="8" r="3" />
        </svg>
      );
    case "output":
      return (
        <svg viewBox="0 0 16 16" className={cls} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M2 8h7" strokeLinecap="round" />
          <rect x="10.5" y="6.3" width="3.2" height="3.4" />
        </svg>
      );
  }
}

function NodeBox({
  node,
  step,
  active,
}: {
  node: BlueprintNode;
  step: number;
  active: boolean;
}) {
  return (
    <Reveal step={step} active={active}>
      <div
        tabIndex={0}
        className="group relative inline-flex items-center gap-2 border border-divider bg-surface px-3 py-2.5 outline-none transition-colors duration-200 hover:border-text/35 focus-visible:border-text/35"
      >
        <span aria-hidden="true" className="font-mono text-[10px] text-text/35">
          {node.id}
        </span>
        <NodeGlyph kind={node.kind} />
        <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.08em] text-text">
          {node.label}
        </span>
        {node.tag && (
          <span aria-hidden="true" className="whitespace-nowrap font-mono text-[9px] tracking-[0.06em] text-text/35">
            {node.tag}
          </span>
        )}
        <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.08em] text-accent-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:opacity-100 [@media(hover:none)]:opacity-100">
          {node.detail}
        </span>
      </div>
    </Reveal>
  );
}

function Straight({ step, active, full = false }: { step: number; active: boolean; full?: boolean }) {
  return (
    <ConnectorReveal
      step={step}
      active={active}
      className={`relative flex h-10 justify-center ${full ? "col-span-3" : ""}`}
    >
      <div aria-hidden="true" className="h-full w-px bg-divider" />
      <ArrowDown className="absolute bottom-0 left-1/2 -translate-x-1/2 text-divider" />
    </ConnectorReveal>
  );
}

function Elbow({
  variant,
  step,
  active,
  accent = false,
}: {
  variant: "split" | "merge";
  step: number;
  active: boolean;
  accent?: boolean;
}) {
  const line = accent ? "bg-accent-2/60" : "bg-divider";
  const arrow = accent ? "text-accent-2/70" : "text-divider";
  const dot = accent ? "bg-accent-2/70" : "bg-divider";
  const junction = (
    <div aria-hidden="true" className={`absolute left-1/2 top-5 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full ${dot}`} />
  );
  if (variant === "split") {
    return (
      <ConnectorReveal step={step} active={active} className="relative col-span-3 h-10">
        <div aria-hidden="true" className={`absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 ${line}`} />
        <div aria-hidden="true" className={`absolute left-[16.667%] right-[16.667%] top-5 h-px ${line}`} />
        <div aria-hidden="true" className={`absolute left-[16.667%] top-5 h-5 w-px ${line}`} />
        <div aria-hidden="true" className={`absolute right-[16.667%] top-5 h-5 w-px ${line}`} />
        <ArrowDown className={`absolute bottom-0 left-[16.667%] -translate-x-1/2 ${arrow}`} />
        <ArrowDown className={`absolute bottom-0 right-[16.667%] translate-x-1/2 ${arrow}`} />
        {junction}
      </ConnectorReveal>
    );
  }
  return (
    <ConnectorReveal step={step} active={active} className="relative col-span-3 h-10">
      <div aria-hidden="true" className={`absolute left-[16.667%] top-0 h-5 w-px ${line}`} />
      <div aria-hidden="true" className={`absolute right-[16.667%] top-0 h-5 w-px ${line}`} />
      <div aria-hidden="true" className={`absolute left-[16.667%] right-[16.667%] top-5 h-px ${line}`} />
      <div aria-hidden="true" className={`absolute left-1/2 top-5 h-5 w-px -translate-x-1/2 ${line}`} />
      <ArrowDown className={`absolute bottom-0 left-1/2 -translate-x-1/2 ${arrow}`} />
      {junction}
    </ConnectorReveal>
  );
}

export function OperationBlueprint() {
  const { ref, active } = useSequentialReveal<HTMLDivElement>();

  return (
    <div ref={ref}>
      {/* Desktop / tablet — arquitetura ramificada */}
      <div className="relative hidden overflow-hidden border border-divider/70 blueprint-grid px-6 pb-10 pt-12 sm:block sm:px-10">
        <span
          aria-hidden="true"
          className="absolute left-5 top-3 font-mono text-[10px] uppercase tracking-[0.12em] text-text/35 sm:left-7"
        >
          Process / Flow — 01
        </span>
        <span
          aria-hidden="true"
          className="absolute right-5 top-3 font-mono text-[10px] uppercase tracking-[0.12em] text-text/35 sm:right-7"
        >
          Nós · 07
        </span>

        <div className="grid grid-cols-3">
          <div className="col-span-3 flex justify-center py-2">
            <NodeBox node={NODES.pedido} step={0} active={active} />
          </div>
          <Straight step={1} active={active} full />
          <div className="col-span-3 flex justify-center py-2">
            <NodeBox node={NODES.planilha} step={2} active={active} />
          </div>

          <Elbow variant="split" step={3} active={active} />

          <div className="flex justify-center py-2">
            <NodeBox node={NODES.whatsapp} step={4} active={active} />
          </div>
          <div />
          <div className="flex justify-center py-2">
            <NodeBox node={NODES.email} step={4} active={active} />
          </div>

          <Straight step={5} active={active} />
          <div />
          <Straight step={5} active={active} />

          <div className="flex justify-center py-2">
            <NodeBox node={NODES.responsavel} step={7} active={active} />
          </div>
          <div />
          <div className="flex justify-center py-2">
            <NodeBox node={NODES.outraPlanilha} step={6} active={active} />
          </div>

          <Elbow variant="merge" step={8} active={active} accent />

          <div className="col-span-3 flex justify-center py-2">
            <NodeBox node={NODES.relatorio} step={9} active={active} />
          </div>

          <ConnectorReveal step={10} active={active} className="relative col-span-3 flex justify-center pt-2">
            <div aria-hidden="true" className="h-8 w-px bg-accent/40" />
            <ArrowDown className="absolute bottom-0 left-1/2 -translate-x-1/2 text-accent/60" />
          </ConnectorReveal>
        </div>
      </div>

      {/* Mobile — composição vertical, sem ramificação */}
      <div className="flex flex-col items-center border border-divider/70 blueprint-grid px-4 py-10 sm:hidden">
        <span aria-hidden="true" className="mb-6 self-start font-mono text-[10px] uppercase tracking-[0.12em] text-text/35">
          Process / Flow — 01
        </span>
        {(
          [
            NODES.pedido,
            NODES.planilha,
            NODES.whatsapp,
            NODES.email,
            NODES.outraPlanilha,
            NODES.responsavel,
            NODES.relatorio,
          ] as BlueprintNode[]
        ).map((node, index) => (
          <div key={node.id} className="flex flex-col items-center">
            {index > 0 && <Straight step={index * 2 - 1} active={active} />}
            <div className="py-2">
              <NodeBox node={node} step={index * 2} active={active} />
            </div>
          </div>
        ))}
        <ConnectorReveal step={13} active={active} className="relative flex justify-center pt-2">
          <div aria-hidden="true" className="h-8 w-px bg-accent/40" />
          <ArrowDown className="absolute bottom-0 left-1/2 -translate-x-1/2 text-accent/60" />
        </ConnectorReveal>
      </div>
    </div>
  );
}
