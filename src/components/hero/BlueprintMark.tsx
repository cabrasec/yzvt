const corners = [
  "left-0 top-0 border-l border-t",
  "right-0 top-0 border-r border-t",
  "left-0 bottom-0 border-l border-b",
  "right-0 bottom-0 border-r border-b",
];

/**
 * Composição técnica do Hero: o símbolo da marca apresentado dentro de uma
 * moldura discreta — grade fina, círculo de referência, corner brackets,
 * linhas de construção e um marcador técnico.
 */
export function BlueprintMark() {
  return (
    <div aria-hidden="true" className="relative flex justify-center lg:justify-end">
      <div
        className="relative flex h-64 w-64 items-center justify-center bg-[linear-gradient(to_right,rgba(167,139,250,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(167,139,250,0.12)_1px,transparent_1px)] bg-[length:20px_20px] sm:h-80 sm:w-80 sm:bg-[length:24px_24px] lg:h-[35rem] lg:w-[35rem] lg:translate-x-10 lg:bg-[length:28px_28px]"
      >
        {corners.map((position) => (
          <span
            key={position}
            className={`absolute h-4 w-4 border-accent-2/50 ${position}`}
          />
        ))}

        <div className="absolute inset-5 rounded-full border border-dashed border-accent-2/60 sm:inset-8" />

        <svg
          className="absolute inset-0 h-full w-full text-accent-2/40"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line x1="4" y1="96" x2="96" y2="4" stroke="currentColor" strokeWidth="0.22" />
          <line x1="20" y1="96" x2="96" y2="20" stroke="currentColor" strokeWidth="0.22" />
        </svg>

        <span className="absolute bottom-10 right-10 h-3 w-3">
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-divider" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-divider" />
        </span>

        <svg
          className="relative h-[17rem] w-[17rem] overflow-visible sm:h-[22rem] sm:w-[22rem] lg:h-[30rem] lg:w-[30rem]"
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
