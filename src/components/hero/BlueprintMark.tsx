import { BrandMark } from "@/components/brand/BrandMark";

const corners = [
  "left-0 top-0 border-l border-t",
  "right-0 top-0 border-r border-t",
  "left-0 bottom-0 border-l border-b",
  "right-0 bottom-0 border-r border-b",
];

/**
 * Composição técnica do Hero: o símbolo da marca apresentado sobre linhas de
 * construção arquitetônicas — grade fina, círculo de referência, cantos e
 * uma diagonal, todos discretos o suficiente para não competir com o símbolo.
 *
 * O símbolo é o mesmo BrandMark do Header (fonte única do Z de três faixas),
 * só que em escala de Hero — antes este componente tinha uma geometria própria.
 */
export function BlueprintMark() {
  return (
    <div aria-hidden="true" className="relative flex justify-center lg:justify-end">
      <div
        className="relative flex h-64 w-64 items-center justify-center bg-[linear-gradient(to_right,var(--color-blueprint-faint)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-blueprint-faint)_1px,transparent_1px)] bg-[length:20px_20px] sm:h-80 sm:w-80 sm:bg-[length:24px_24px] lg:h-[30rem] lg:w-[37.5rem] lg:translate-x-10 lg:bg-[length:28px_28px]"
      >
        {corners.map((position) => (
          <span
            key={position}
            className={`absolute h-3 w-3 border-accent-2/[0.18] ${position}`}
          />
        ))}

        <div className="absolute inset-5 rounded-full border border-dashed border-accent-2/[0.15] sm:inset-8" />

        <svg
          className="absolute inset-0 h-full w-full text-accent-2/[0.12]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line x1="4" y1="96" x2="96" y2="4" stroke="currentColor" strokeWidth="0.16" />
        </svg>

        {/* O Z ocupa ~62% do quadro: cabe dentro do círculo tracejado sem
            encostar nos cantos, como no Logo System. */}
        <BrandMark
          id="hero-mark"
          className="relative h-40 w-40 sm:h-52 sm:w-52 lg:h-72 lg:w-72"
        />
      </div>
    </div>
  );
}
