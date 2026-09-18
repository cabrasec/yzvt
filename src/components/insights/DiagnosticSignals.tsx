type Signal = {
  number: string;
  kicker: string;
  heading: string;
  text: string;
};

type DiagnosticSignalsProps = {
  items: Signal[];
};

// Sinal 01 — mesmo arquivo, números diferentes por pessoa.
function VisualMismatch() {
  return (
    <div aria-hidden="true" className="flex w-full max-w-64 flex-col items-center">
      <p className="text-[11.5px] text-text/60">Arquivo</p>
      <div className="h-[18px] w-px bg-divider" />
      <div className="relative h-px w-full">
        <div className="absolute left-[16.667%] right-[16.667%] top-0 h-px bg-divider" />
      </div>
      <div className="grid w-full grid-cols-3 justify-items-center">
        <div className="h-4 w-px bg-divider" />
        <div className="h-4 w-px bg-divider" />
        <div className="h-4 w-px bg-divider" />
      </div>
      <div className="grid w-full grid-cols-3 justify-items-center">
        <div className="flex flex-col items-center gap-2">
          <p className="text-[11.5px] text-text/60">Pessoa</p>
          <p className="text-sm font-semibold">42</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-[11.5px] text-text/60">Pessoa</p>
          <p className="text-sm font-semibold text-accent">38</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-[11.5px] text-text/60">Pessoa</p>
          <p className="text-sm font-semibold">42</p>
        </div>
      </div>
    </div>
  );
}

// Sinal 02 — a mesma informação passa por ferramentas cada vez mais distantes.
function VisualChain() {
  const steps = [
    { label: "WhatsApp", width: "w-3.5" },
    { label: "Planilha", width: "w-6" },
    { label: "E-mail", width: "w-9" },
    { label: "Responsável", width: "w-12" },
  ];
  return (
    <div aria-hidden="true" className="flex w-full max-w-60 flex-col gap-2.5">
      {steps.map((step) => (
        <div key={step.label} className="flex items-center gap-2.5">
          <div className={`h-px border-t border-dashed border-text/25 ${step.width}`} />
          <p className="text-[11.5px] text-text/60">{step.label}</p>
        </div>
      ))}
    </div>
  );
}

// Sinal 03 — as mesmas quatro tarefas, fechadas em loop, todos os dias.
function VisualLoop() {
  const tasks = ["Copiar", "Conferir", "Atualizar", "Enviar"];
  return (
    <div aria-hidden="true" className="inline-block max-w-60">
      <div className="flex flex-wrap gap-x-3.5 gap-y-2">
        {tasks.map((task) => (
          <p key={task} className="text-[11.5px] text-text/60">
            {task}
          </p>
        ))}
      </div>
      <div className="relative mt-2.5 h-6">
        <div className="absolute inset-y-0 left-0 w-px bg-accent/50" />
        <div className="absolute inset-y-0 right-0 w-px bg-accent/50" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-accent/50" />
      </div>
      <p className="mt-2.5 text-[11.5px] text-text/60">Todos os dias, de novo</p>
    </div>
  );
}

// Sinal 04 — o dado já existe bem antes de a decisão finalmente acontecer.
function VisualDelay() {
  return (
    <div aria-hidden="true" className="w-full max-w-60">
      <div className="relative my-3.5 h-px bg-divider">
        <div className="absolute -top-[5px] left-[14%] h-[11px] w-px bg-divider" />
        <div className="absolute left-[14%] right-0 top-0 h-px bg-accent/35" />
        <div className="absolute -top-[7px] right-0 h-[15px] w-px bg-accent" />
      </div>
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11.5px] text-text/60">O dado existe</p>
        <p className="text-right text-[11.5px] font-semibold text-text">A decisão acontece</p>
      </div>
    </div>
  );
}

const visuals = [VisualMismatch, VisualChain, VisualLoop, VisualDelay];

// Lista empilhada, sempre visível — cada sinal é uma cena reconhecível do
// dia a dia da operação, não uma categoria abstrata. Sem tabs: o ponto não é
// escolher um sinal, é reconhecer que os quatro já aconteceram. Um pequeno
// diagrama ilustra cada cena, alternando de lado para criar um zigue-zague
// de leitura em vez de uma coluna repetitiva de quatro blocos iguais.
export function DiagnosticSignals({ items }: DiagnosticSignalsProps) {
  return (
    <div className="mt-10 flex flex-col">
      {items.map((item, index) => {
        const Visual = visuals[index % visuals.length];
        const reversed = index % 2 === 1;
        return (
          <div
            key={item.number}
            className={`flex flex-col gap-8 border-t border-divider py-8 last:border-b sm:flex-row sm:items-start sm:gap-10 sm:py-11 ${
              reversed ? "sm:flex-row-reverse" : ""
            }`}
          >
            <div className="min-w-0 flex-1">
              <p className="text-[11px] uppercase tracking-[0.18em] text-text/60">
                <span className="text-accent">{item.number}</span> {item.kicker}
              </p>
              <p className="mt-4 max-w-lg text-lg font-semibold leading-snug sm:text-xl">
                {item.heading}
              </p>
              <p className="mt-3 max-w-xl text-text/75">{item.text}</p>
            </div>
            <div className="flex flex-none justify-center pt-2 sm:w-60">
              <Visual />
            </div>
          </div>
        );
      })}
    </div>
  );
}
