"use client";

import { useEffect, useRef, useState } from "react";

type Signal = {
  number: string;
  tag: string;
  heading: string;
  text: string;
};

type DiagnosticSignalsProps = {
  items: Signal[];
};

// Diagnóstico interativo: 4 sinais como "abas" — clique, teclado (Enter/Espaço,
// nativo de <button>) ou hover (desktop, com pequeno debounce para não trocar
// de conteúdo enquanto o mouse apenas atravessa a fileira). Os 4 painéis ficam
// empilhados na mesma célula de grid e alternam opacidade — o container se
// ajusta automaticamente ao painel mais alto, sem "salto" de altura.
export function DiagnosticSignals({ items }: DiagnosticSignalsProps) {
  const [active, setActive] = useState(0);
  const hoverTimeout = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (hoverTimeout.current) window.clearTimeout(hoverTimeout.current);
    };
  }, []);

  function scheduleHover(index: number) {
    if (index === active) return;
    if (hoverTimeout.current) window.clearTimeout(hoverTimeout.current);
    hoverTimeout.current = window.setTimeout(() => setActive(index), 220);
  }

  function cancelHover() {
    if (hoverTimeout.current) {
      window.clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
  }

  return (
    <div className="mt-12">
      <div
        role="tablist"
        aria-label="Sinais de que a operação já exige software"
        className="grid grid-cols-2 gap-px overflow-hidden border border-divider bg-divider sm:grid-cols-4"
      >
        {items.map((item, index) => {
          const isActive = index === active;
          return (
            <button
              key={item.number}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(index)}
              onMouseEnter={() => scheduleHover(index)}
              onMouseLeave={cancelHover}
              className={`bg-bg px-4 py-5 text-left transition-colors duration-300 hover:bg-surface focus-visible:relative focus-visible:z-10 sm:px-5 ${
                isActive ? "bg-surface" : ""
              }`}
            >
              <span
                className={`text-xs tracking-[0.3em] transition-colors duration-300 ${
                  isActive ? "text-accent-2" : "text-text/55"
                }`}
              >
                {item.number}
              </span>
              <p
                className={`mt-2 text-xs font-semibold uppercase tracking-[0.1em] transition-colors duration-300 ${
                  isActive ? "text-text" : "text-text/65"
                }`}
              >
                {item.tag}
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid border-t border-divider pt-8">
        {items.map((item, index) => (
          <div
            key={item.number}
            aria-hidden={index !== active}
            className={`col-start-1 row-start-1 transition-opacity duration-200 motion-reduce:transition-none ${
              index === active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <h3 className="text-xl font-bold tracking-[-0.01em] sm:text-2xl">
              {item.heading}
            </h3>
            <p className="mt-4 max-w-2xl text-text/70">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
