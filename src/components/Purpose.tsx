import Image from "next/image";
import { Container } from "@/components/Container";

export function Purpose() {
  return (
    <section className="relative overflow-hidden bg-[#F4F3F0] pb-16 pt-10 sm:pt-14 lg:pb-24 lg:pt-16">
      <Container className="flex flex-wrap items-stretch gap-8 lg:gap-20">
        <div className="min-w-0 max-w-[40rem] flex-[1_1_34rem]">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Nosso propósito</p>

          <h2 className="mt-8 text-4xl font-bold leading-[1.02] tracking-[-0.02em] text-[#15151a] sm:text-5xl lg:text-[5.5rem]">
            Criar valor para
            <br />
            <span className="text-accent">pequenos negócios.</span>
          </h2>

          <div className="mt-14 max-w-md space-y-5 text-base text-black/65 lg:ml-28">
            <p>
              Acreditamos que a tecnologia só faz sentido quando resolve um
              problema real do dia a dia de uma empresa.
            </p>
            <p>
              Por isso, desenvolvemos soluções sob medida, pensadas para a
              realidade de cada negócio e para reduzir a complexidade da
              operação, não para aumentá-la.
            </p>
          </div>

          <p className="mt-14 max-w-xs border-t border-black/15 pt-4 text-xs uppercase tracking-[0.15em] text-black/45 lg:ml-28">
            Tecnologia pensada para
            <br />
            quem toca o negócio no dia a dia.
          </p>
        </div>

        <div className="relative min-h-[26rem] min-w-0 flex-[1_1_22rem] self-stretch lg:min-h-[min(58vh,44rem)] lg:-mr-[calc(2rem+max(0px,(100vw-72rem)/2))]">
          <Image
            src="/img/richard-williams-aImqKqAq6I0-unsplash.jpg"
            alt="Corredor arquitetônico moderno em preto e branco, com estrutura de vidro, concreto e linhas verticais em perspectiva"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover grayscale contrast-[1.05] brightness-[0.97]"
          />
        </div>
      </Container>
    </section>
  );
}
