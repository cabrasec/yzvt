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
 */
export function BlueprintMark() {
  return (
    <div aria-hidden="true" className="relative flex justify-center lg:justify-end">
      <div
        className="relative flex h-64 w-64 items-center justify-center bg-[linear-gradient(to_right,rgba(167,139,250,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(167,139,250,0.035)_1px,transparent_1px)] bg-[length:20px_20px] sm:h-80 sm:w-80 sm:bg-[length:24px_24px] lg:h-[30rem] lg:w-[37.5rem] lg:translate-x-10 lg:bg-[length:28px_28px]"
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

        <svg
          className="relative h-[17.85rem] w-[17.85rem] overflow-visible sm:h-[23.1rem] sm:w-[23.1rem] lg:h-[28.125rem] lg:w-[28.125rem]"
          viewBox="0 0 100 100"
          fill="none"
        >
          <defs>
            <linearGradient id="mark-top" x1="18" y1="20" x2="83" y2="70" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8657F2" />
              <stop offset="0.38" stopColor="#7139E8" />
              <stop offset="0.67" stopColor="#572ACB" />
              <stop offset="1" stopColor="#35198F" />
            </linearGradient>
            <linearGradient id="mark-bottom" x1="30" y1="38" x2="78" y2="91" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7F4DEF" />
              <stop offset="0.48" stopColor="#6330D7" />
              <stop offset="1" stopColor="#3A1B9F" />
            </linearGradient>
          </defs>
          <path d="M16 37 33 13h55v24L65 63V37H44Z" fill="url(#mark-top)" opacity="0.96" />
          <path d="M15 67 44 37v30h52L67 90H15Z" fill="url(#mark-bottom)" opacity="0.9" />
          <path d="M16 37h28v30h52" stroke="#7139E8" strokeWidth="0.18" opacity="0.75" />
        </svg>
      </div>
    </div>
  );
}
