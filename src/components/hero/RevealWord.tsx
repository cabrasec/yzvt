"use client";

import { useEffect, useRef, useState } from "react";

type RevealWordProps = {
  children: string;
  className?: string;
};

/**
 * Revela o texto real (não é pseudo-elemento nem imagem) progressivamente da
 * esquerda para a direita via clip-path, uma única vez, quando o elemento
 * entra na viewport. `prefers-reduced-motion` é resolvido inteiramente via
 * CSS (globals.css), que força visibilidade total sem animação independente
 * do JS — funciona mesmo antes da hidratação.
 *
 * O IntersectionObserver observa um wrapper SEM clip-path, não o próprio span
 * mascarado: o clip-path zera a área visível/interseccionada do seu próprio
 * alvo, então observar o span mascarado faz a ratio ficar sempre ~0 e o
 * threshold nunca ser atingido, mesmo com o elemento visível na tela.
 */
export function RevealWord({ children, className = "" }: RevealWordProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={wrapperRef}>
      <span className={`reveal-mask ${revealed ? "is-revealed" : ""} ${className}`}>
        {children}
      </span>
    </span>
  );
}
