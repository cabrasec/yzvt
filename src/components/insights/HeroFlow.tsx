import type { CSSProperties } from "react";

// Diagrama do Hero: o mesmo pedido passando por seis lugares antes de virar
// relatório. Puro CSS (classe .dg em globals.css) — roda uma vez ao carregar
// a página, sem IntersectionObserver, porque já está acima da dobra.
function dg(name: "dg-in" | "dg-scale-y" | "dg-scale-x", durationMs: number, delayMs: number): CSSProperties {
  return {
    animationName: name,
    animationDuration: `${durationMs}ms`,
    animationDelay: `${delayMs}ms`,
  };
}

function Node({ delayMs, className = "", children }: { delayMs: number; className?: string; children: string }) {
  return (
    <div className="col-span-3 py-1 text-center">
      <span className={`dg inline-block opacity-0 ${className}`} style={dg("dg-in", 400, delayMs)}>
        {children}
      </span>
    </div>
  );
}

function VLine({ delayMs, className = "" }: { delayMs: number; className?: string }) {
  return (
    <div className={`col-span-3 flex justify-center ${className}`}>
      <div aria-hidden="true" className="dg h-full w-px origin-top bg-divider" style={dg("dg-scale-y", 280, delayMs)} />
    </div>
  );
}

export function HeroFlow() {
  return (
    <figure className="m-0">
      <div className="grid grid-cols-3 items-center justify-items-center gap-y-0 py-2">
        <Node delayMs={0} className="text-sm text-text/60">
          Pedido do cliente
        </Node>
        <VLine delayMs={120} className="h-8" />
        <Node delayMs={300} className="text-2xl font-semibold tracking-[-0.01em] sm:text-3xl">
          Planilha
        </Node>

        {/* split: Planilha -> WhatsApp / E-mail */}
        <div className="relative col-span-3 h-9 w-full">
          <div className="dg absolute left-1/2 top-0 h-[46%] w-px origin-top -translate-x-1/2 bg-divider" style={dg("dg-scale-y", 220, 420)} />
          <div className="dg absolute left-[16.667%] right-[16.667%] top-[46%] h-px origin-center bg-divider" style={dg("dg-scale-x", 300, 520)} />
          <div className="dg absolute left-[16.667%] top-[46%] h-[54%] w-px origin-top bg-divider" style={dg("dg-scale-y", 220, 700)} />
          <div className="dg absolute right-[16.667%] top-[46%] h-[42%] w-px origin-top bg-divider" style={dg("dg-scale-y", 220, 700)} />
        </div>

        <div className="py-1 text-center">
          <span className="dg inline-block text-base font-medium opacity-0 sm:text-lg" style={dg("dg-in", 380, 820)}>
            WhatsApp
          </span>
        </div>
        <div />
        <div className="py-1 text-center">
          <span className="dg inline-block text-base font-medium opacity-0 sm:text-lg" style={dg("dg-in", 380, 820)}>
            E-mail
          </span>
        </div>

        <VLine delayMs={960} className="h-7 justify-self-stretch" />
        <div />
        <VLine delayMs={960} className="h-7 justify-self-stretch" />

        <div className="py-1 text-center">
          <span className="dg inline-block text-sm text-text/60 opacity-0" style={dg("dg-in", 380, 1080)}>
            Responsável
          </span>
        </div>
        <div />
        <div className="py-1 text-center">
          <span className="dg inline-block text-sm text-text/60 opacity-0" style={dg("dg-in", 380, 1080)}>
            Outra planilha
          </span>
        </div>

        {/* merge: Responsável / Outra planilha -> Relatório de segunda */}
        <div className="relative col-span-3 h-9 w-full">
          <div className="dg absolute left-[16.667%] top-0 h-[54%] w-px origin-top bg-divider" style={dg("dg-scale-y", 220, 1240)} />
          <div className="dg absolute right-[16.667%] top-0 h-[54%] w-px origin-top bg-divider" style={dg("dg-scale-y", 220, 1240)} />
          <div className="dg absolute left-[16.667%] right-[16.667%] top-[54%] h-px origin-center bg-divider" style={dg("dg-scale-x", 300, 1340)} />
          <div className="dg absolute left-1/2 top-[54%] h-[46%] w-px origin-top -translate-x-1/2 bg-accent" style={dg("dg-scale-y", 260, 1520)} />
        </div>

        <div className="col-span-3 py-1 text-center">
          <span className="dg relative inline-block pb-1 text-xl font-semibold tracking-[-0.01em] opacity-0 sm:text-2xl" style={dg("dg-in", 380, 1640)}>
            Relatório de segunda
            <span aria-hidden="true" className="dg absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent/40" style={dg("dg-scale-x", 300, 1900)} />
          </span>
        </div>
      </div>

      <figcaption className="mt-8 max-w-sm text-sm text-text/60">
        Um pedido, seis lugares. Cada linha é uma passagem de informação que hoje depende de alguém lembrar de fazer.
      </figcaption>
    </figure>
  );
}
