import { Container } from "@/components/Container";

// Última assinatura da Home, entre o formulário de Contato e o Footer — só
// texto, sem CTA, sem cards, sem imagem. Não é uma segunda Hero: tipografia
// bem menor, alinhada à esquerda, seção compacta.
export function Closing() {
  return (
    <section className="border-t border-divider bg-bg py-16 text-text sm:py-20">
      <Container>
        <div className="max-w-md">
          <div className="h-px w-16 bg-accent-2" aria-hidden="true" />
          <p className="mt-6 text-2xl font-bold uppercase leading-snug tracking-[-0.01em] sm:text-3xl">
            Tecnologia para o próximo passo.
          </p>
          <p className="mt-4 text-text/60">
            Software, automação e produtos digitais para empresas que querem
            evoluir.
          </p>
        </div>
      </Container>
    </section>
  );
}
