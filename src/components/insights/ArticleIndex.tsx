"use client";

import { useEffect, useState } from "react";

type IndexItem = {
  id: string;
  label: string;
};

type ArticleIndexProps = {
  items: IndexItem[];
  className?: string;
};

export function ArticleIndex({ items, className = "" }: ArticleIndexProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Apenas observa quais seções estão na "faixa de leitura" do viewport
    // para destacar o item correspondente no índice — sem controlar o
    // scroll, sem GSAP, sem travar a rolagem nativa.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Índice do artigo"
      className={`lg:sticky lg:top-28 lg:self-start ${className}`}
    >
      <ol className="flex gap-5 overflow-x-auto border-b border-divider pb-4 text-xs uppercase tracking-[0.12em] text-text/50 lg:flex-col lg:gap-3 lg:border-b-0 lg:border-l lg:border-divider lg:pb-0 lg:pl-5">
        {items.map((item, index) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} className="shrink-0 lg:shrink">
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`whitespace-nowrap no-underline transition-colors duration-200 hover:text-text lg:whitespace-normal ${
                  isActive ? "text-accent-2" : "text-text/50"
                }`}
              >
                {String(index + 1).padStart(2, "0")} {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
