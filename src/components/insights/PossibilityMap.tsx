type MapItem = {
  label: string;
  text: string;
};

const ITEMS: MapItem[] = [
  { label: "Pedidos", text: "Receber, validar, distribuir, acompanhar e atualizar automaticamente." },
  { label: "Atendimento", text: "Centralizar solicitações e manter cada atendimento como uma etapa rastreável." },
  { label: "Operações", text: "Organizar rotinas repetitivas em processos executáveis." },
  { label: "Gestão", text: "Consolidar informações de diferentes áreas." },
  { label: "Acompanhamento", text: "Saber o que aconteceu, quem fez, quando e qual é o próximo passo." },
  { label: "Sistemas próprios", text: "Construir uma ferramenta quando as soluções prontas não refletem a realidade da empresa." },
];

// Seis áreas de uma mesma operação, lado a lado — a ideia não é uma
// hierarquia entre elas, é mostrar que já são partes reconhecíveis de um
// possível sistema.
export function PossibilityMap() {
  return (
    <div className="mt-10 border-b border-divider">
      <div className="grid grid-cols-1 border-t border-divider sm:grid-cols-2 sm:gap-x-12">
        {ITEMS.map((item) => (
          <div
            key={item.label}
            className="group border-t border-divider py-7 transition-colors duration-200 first:border-t-0 sm:[&:nth-child(-n+2)]:border-t-0"
          >
            <h3 className="text-lg font-semibold leading-snug transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent-2">
              {item.label}
            </h3>
            <p className="mt-3 max-w-sm text-sm text-text/70">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
