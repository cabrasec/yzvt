type YzevMarkProps = {
  className?: string;
};

/**
 * Yzev Mark — símbolo abstrato oficial da marca, usado exclusivamente no Hero.
 * Fonte única: public/brand/yzev-mark.svg (asset oficial, não redesenhar).
 * Independente do Logo/BrandMark do Header — alterar este componente não
 * afeta o cabeçalho.
 */
export function YzevMark({ className = "" }: YzevMarkProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- asset de marca reaproveitado em tamanhos variáveis via Tailwind; next/image não traz ganho aqui.
    <img
      src="/brand/yzev-mark.svg"
      alt=""
      aria-hidden="true"
      className={className}
    />
  );
}
