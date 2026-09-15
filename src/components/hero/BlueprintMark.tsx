import { BrandMark } from "@/components/brand/BrandMark";

/**
 * Artwork do Hero: símbolo Z + moldura circular técnica, inspirado na seção
 * "08. CONSTRUÇÃO" do Logo System (grade + círculo por trás do símbolo).
 */
export function BlueprintMark() {
  return (
    <div aria-hidden="true" className="relative flex justify-center lg:justify-end">
      <div className="relative flex h-44 w-44 items-center justify-center sm:h-56 sm:w-56 lg:h-[26rem] lg:w-[26rem] lg:translate-x-12">
        <div className="absolute inset-0 rounded-full border border-dashed border-divider" />
        <div className="absolute inset-6 rounded-full border border-divider/60" />
        <BrandMark id="hero-mark" className="relative h-28 w-28 sm:h-36 sm:w-36 lg:h-64 lg:w-64" />
      </div>
    </div>
  );
}
