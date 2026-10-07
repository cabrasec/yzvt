type FlowChainProps = {
  steps?: string[];
  groups?: { label: string; steps: string[] }[];
  /** "automated": todos os nós em verde (processo já automatizado). "neutral" (padrão): nós vazados — execução ainda manual. */
  tone?: "neutral" | "automated";
  /** Acende o último nó em verde mesmo em tom neutro, marcando o ponto onde o fluxo passa a ser automático. */
  emphasizeLast?: boolean;
  branch?: { condition: string; result: string };
  className?: string;
};

const DOT = "relative z-10 mt-[3px] h-[7px] w-[7px] shrink-0 rounded-full";

function Dot({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={active ? `${DOT} bg-accent-2` : `${DOT} border border-text/35 bg-bg`}
    />
  );
}

function StepRow({ number, text, active }: { number: number; text: string; active: boolean }) {
  return (
    <div className="relative flex items-start gap-3 py-2">
      <Dot active={active} />
      <span aria-hidden="true" className="w-5 shrink-0 pt-px text-right text-xs font-semibold text-text/55">
        {String(number).padStart(2, "0")}
      </span>
      <p className="text-sm font-medium leading-snug text-text sm:text-base">{text}</p>
    </div>
  );
}

function GroupLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 pb-1 pt-4 first:pt-0">
      <span aria-hidden="true" className="w-[7px] shrink-0" />
      <span aria-hidden="true" className="w-5 shrink-0" />
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-2">{label}</p>
    </div>
  );
}

// Processo como diagrama tipográfico: uma espinha fina contínua, nós
// numerados ao longo dela, sem caixas, sem sombra, sem ícone. O estado do nó
// (vazado ou preenchido em verde) é quem conta a história — manual continua
// vazado do início ao fim; automatizado acende; um fluxo neutro pode acender
// só no último nó, marcando onde a automação entrega o resultado. Quando
// existe uma exceção, ela sai da espinha principal por um conector
// tracejado, visualmente separada do fluxo automático.
export function FlowChain({
  steps,
  groups,
  tone = "neutral",
  emphasizeLast = true,
  branch,
  className = "",
}: FlowChainProps) {
  const flat = groups ? groups.flatMap((g) => g.steps) : (steps ?? []);
  const lastIndex = flat.length - 1;
  let counter = -1;

  const isActive = (index: number) =>
    tone === "automated" || (emphasizeLast && !branch && index === lastIndex);

  return (
    <div className={`relative ${className}`}>
      <span aria-hidden="true" className="absolute left-[3px] top-[11px] bottom-[11px] w-px bg-divider" />

      {groups
        ? groups.map((group) => (
            <div key={group.label}>
              <GroupLabel label={group.label} />
              {group.steps.map((step) => {
                counter += 1;
                return <StepRow key={step} number={counter + 1} text={step} active={isActive(counter)} />;
              })}
            </div>
          ))
        : flat.map((step, index) => (
            <StepRow key={step} number={index + 1} text={step} active={isActive(index)} />
          ))}

      {branch && (
        <div className="relative flex items-start gap-3 py-2">
          <span
            aria-hidden="true"
            className="relative z-10 mt-[3px] h-[7px] w-[7px] shrink-0 rounded-full border border-dashed border-accent-2 bg-bg"
          />
          <span aria-hidden="true" className="w-5 shrink-0" />
          <div>
            <p className="text-xs uppercase tracking-[0.12em] text-text/65">{branch.condition}</p>
            <p className="mt-1 text-sm font-semibold text-accent-2 sm:text-base">{branch.result}</p>
          </div>
        </div>
      )}
    </div>
  );
}
