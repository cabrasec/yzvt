type MethodStep = {
  number: string;
  heading: string;
  text: string;
};

const STEPS: MethodStep[] = [
  {
    number: "01",
    heading: "Entender",
    text: "Mapeamos como o trabalho acontece hoje.",
  },
  {
    number: "02",
    heading: "Estruturar",
    text: "Identificamos regras, informações, integrações e pontos de decisão.",
  },
  {
    number: "03",
    heading: "Construir",
    text: "Transformamos o processo em uma aplicação adequada à realidade do negócio.",
  },
  {
    number: "04",
    heading: "Evoluir",
    text: "O software não precisa nascer enorme. Ele pode começar resolvendo um problema específico e crescer junto com a operação.",
  },
];

// Método de engenharia, não timeline de jornada do cliente: uma linha técnica
// contínua (horizontal no desktop, vertical no mobile) com um pequeno nó por
// etapa. Estático — sem estado de seleção, sem animação nova (a seção
// original também não tinha nenhuma).
export function EngineeringMethod() {
  return (
    <div className="mt-12">
      {/* Desktop / tablet — sequência horizontal sobre uma linha técnica contínua */}
      <div className="relative hidden sm:block">
        <div aria-hidden="true" className="absolute left-0 right-0 top-0 h-px bg-divider" />
        <div className="grid sm:grid-cols-4 sm:gap-8">
          {STEPS.map((step) => (
            <div key={step.number} className="relative pt-6">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent"
              />
              <span className="text-xs tracking-[0.3em] text-text/60">{step.number}</span>
              <h3 className="mt-2 flex items-center gap-2 text-base font-bold uppercase tracking-[0.02em]">
                <span aria-hidden="true" className="h-px w-4 bg-accent/70" />
                {step.heading}
              </h3>
              <p className="mt-3 text-sm text-text/70">{step.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile — sequência vertical, mesma linguagem técnica */}
      <div className="relative pl-6 sm:hidden">
        <div aria-hidden="true" className="absolute left-0 top-1 bottom-1 w-px bg-divider" />
        <div className="space-y-10">
          {STEPS.map((step) => (
            <div key={step.number} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-6 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent"
              />
              <span className="text-xs tracking-[0.3em] text-text/60">{step.number}</span>
              <h3 className="mt-2 flex items-center gap-2 text-base font-bold uppercase tracking-[0.02em]">
                <span aria-hidden="true" className="h-px w-4 bg-accent/70" />
                {step.heading}
              </h3>
              <p className="mt-3 max-w-md text-sm text-text/70">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
