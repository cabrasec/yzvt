"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type StaggerRevealProps = {
  children: ReactNode[];
  className?: string;
  staggerMs?: number;
};

// Revela os filhos em cascata (fade + leve subida) quando o bloco entra na
// viewport — microinteração simples via IntersectionObserver, sem GSAP e
// sem controlar o scroll. Dispara uma única vez, na primeira vez que o
// usuário rola até o bloco.
export function StaggerReveal({
  children,
  className = "",
  staggerMs = 90,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          style={{ transitionDelay: visible ? `${index * staggerMs}ms` : "0ms" }}
          className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
