import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { buttonClasses } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { ArticleIndex } from "@/components/insights/ArticleIndex";
import { FlowChain } from "@/components/insights/FlowChain";

export const metadata: Metadata = {
  title: "Sua empresa está perdendo clientes por não ter uma página que vende? | Yzev",
  description:
    "Nem toda empresa precisa começar com um sistema completo. Às vezes, o primeiro passo é uma página que coloca uma oferta na frente das pessoas certas.",
};

// Mesmo sistema visual das outras duas páginas de insight: superfície clara
// via .theme-light, duas ilhas .theme-dark para os momentos editoriais de
// maior peso, e o mesmo grid de leitura (índice + coluna de 46rem).
// FlowChain é reaproveitado deste mesmo sistema (insights/automação); nenhum
// componente compartilhado foi alterado para esta página.

const indexItems = [
  { id: "problema", label: "O problema" },
  { id: "uma-pagina-uma-funcao", label: "Uma página não precisa fazer tudo" },
  { id: "o-que-uma-boa-pagina-precisa", label: "O que uma boa página precisa" },
  { id: "quando-faz-mais-sentido", label: "Quando faz mais sentido que um sistema" },
  { id: "comecar-pequeno", label: "Começar pequeno" },
];

const commercialFlow = ["Oferta", "Landing page", "Visita", "Contato", "Oportunidade", "Venda"];

const pageComponents = [
  "O problema que resolve",
  "O serviço oferecido",
  "Diferenciais reais",
  "Região atendida",
  "Perguntas frequentes",
  "Formulário de contato",
  "Botão de WhatsApp",
];

const communicatesItems = [
  "Proposta clara",
  "Público definido",
  "Oferta objetiva",
  "Prova ou informação relevante, quando existir",
];

const behavesItems = [
  "Hierarquia visual",
  "Uma chamada para ação clara",
  "Formulário ou canal de contato",
  "Carregamento rápido",
  "Boa experiência no celular",
  "Acompanhamento básico de resultado",
];

const contactFlow = ["Visibilidade", "Oferta", "Landing page", "Contato", "Atendimento", "Oportunidade"];

const startSmallFlow = [
  "Uma página",
  "WhatsApp integrado",
  "Formulário",
  "CRM conectado",
  "Atendimento automatizado",
  "Processo vira software",
];

const relatedArticles = [
  {
    tag: "Automação",
    title: "Sua empresa ainda depende de tarefas que poderiam acontecer sozinhas?",
    href: "/insights/sua-empresa-ainda-depende-de-tarefas-que-poderiam-acontecer-sozinhas",
  },
  {
    tag: "Software",
    title: "Quando uma planilha deixa de ser suficiente?",
    href: "/insights/quando-uma-planilha-deixa-de-ser-suficiente",
  },
  {
    tag: "Produto",
    title: "E se um problema interno pudesse virar um produto?",
    href: "/insights/e-se-um-problema-interno-pudesse-virar-um-produto",
  },
];

// Grid com a mesma largura de coluna do índice lateral, usado nos blocos que
// vêm depois do primeiro (índice não se repete — some, e o texto continua
// alinhado à mesma margem esquerda do artigo).
const readingGrid = "lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16";

export default function Page() {
  return (
    <>
    <main className="theme-light bg-bg text-text">
      {/* HERO — só texto: tese do artigo logo abaixo do título, sem diagrama */}
      <section className="border-b border-divider">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Desenvolvimento Web</p>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl lg:text-[3.25rem]">
              Sua empresa está perdendo clientes por não ter uma página que vende?
            </h1>
            <p className="mt-6 max-w-xl text-lg text-text/75">
              Muitas empresas têm Instagram, WhatsApp e indicação, mas não têm
              uma página própria que explique claramente o que oferecem e
              conduza o visitante para o próximo passo.
            </p>
            <div className="mt-10 max-w-xl">
              <div className="h-px w-16 bg-accent" aria-hidden="true" />
              <p className="mt-6 text-2xl font-bold leading-snug tracking-[-0.01em] sm:text-3xl">
                Nem toda empresa precisa começar com um sistema completo. Às
                vezes, o primeiro passo é uma página que coloca uma oferta na
                frente das pessoas certas.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <article>
        {/* CORPO EDITORIAL — bloco 1: índice lateral + problema */}
        <Container className={`py-20 sm:py-24 ${readingGrid} lg:py-28`}>
          <ArticleIndex items={indexItems} className="mb-14 lg:mb-0" />

          <div className="max-w-3xl space-y-20 sm:space-y-24 lg:space-y-28">
            <section id="problema" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                Visibilidade não é a mesma coisa que uma página própria
              </h2>
              <div className="mt-6 max-w-xl space-y-4 text-lg text-text/75">
                <p>
                  Perfil no Instagram, número de WhatsApp, indicação de quem
                  já é cliente: isso é visibilidade. Não é necessariamente um
                  lugar que explica a oferta, mostra o que torna o serviço
                  diferente e leva o visitante até o próximo passo.
                </p>
                <p>
                  Sem uma página assim, cada pessoa interessada precisa
                  reconstruir sozinha o que a empresa faz, a partir de
                  pedaços espalhados em lugares diferentes.
                </p>
              </div>
              <p className="mt-10 max-w-xl text-xl font-semibold leading-snug tracking-[-0.01em] text-text/80 sm:text-2xl">
                O problema raramente é falta de visibilidade. Geralmente é
                não ter para onde mandar quem já está interessado.
              </p>
            </section>
          </div>
        </Container>

        {/* MOMENTO DARK — site vs. página comercial */}
        <section className="theme-dark border-y border-divider bg-bg text-text py-24 sm:py-32">
          <Container className={readingGrid}>
            <div aria-hidden="true" className="hidden lg:block" />
            <div className="max-w-3xl">
              <div className="mb-6 h-px w-16 bg-accent-2" aria-hidden="true" />
              <p className="text-3xl font-bold leading-[1.15] tracking-[-0.01em] sm:text-5xl lg:text-6xl">
                Ter um site é uma coisa. Ter uma página pensada para um{" "}
                <span className="text-accent-2">objetivo comercial</span> é
                outra.
              </p>
              <p className="mt-8 max-w-xl text-lg text-text/70">
                Um site apresenta a empresa. Uma página comercial conduz
                alguém até o próximo passo: um formulário, uma mensagem no
                WhatsApp, um pedido de orçamento.
              </p>
            </div>
          </Container>
        </section>

        {/* CORPO EDITORIAL — bloco 2: uma função só + o que uma boa página precisa */}
        <Container className={`py-20 sm:py-24 ${readingGrid} lg:py-28`}>
          <div aria-hidden="true" className="hidden lg:block" />

          <div className="max-w-3xl space-y-20 sm:space-y-24 lg:space-y-28">
            <section id="uma-pagina-uma-funcao" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                Uma página não precisa fazer tudo
              </h2>
              <p className="mt-5 max-w-xl text-lg text-text/75">
                Ela pode ter uma função só, bem clara. Vista como uma peça
                comercial, o caminho é simples:
              </p>
              <FlowChain steps={commercialFlow} className="mt-10" />

              <div className="mt-16">
                <h3 className="text-xl font-bold leading-snug tracking-[-0.01em] sm:text-2xl">
                  Um exemplo simples
                </h3>
                <p className="mt-4 max-w-xl text-text/75">
                  Uma empresa que faz manutenção de ar-condicionado, por
                  exemplo, não precisa de um sistema completo para começar.
                  Pode criar uma página específica: &ldquo;Manutenção de
                  ar-condicionado para empresas&rdquo;. Nela, o visitante
                  encontra:
                </p>
                <ul className="mt-6 flex flex-col gap-3 text-text/75">
                  {pageComponents.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-6 max-w-xl text-lg font-semibold text-text/80">
                  O objetivo é simples: transformar interesse em contato.
                </p>
              </div>
            </section>

            <section id="o-que-uma-boa-pagina-precisa" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                O que uma boa página precisa
              </h2>
              <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-14">
                <div>
                  <h3 className="border-t border-divider pt-3.5 text-xs uppercase tracking-[0.2em] text-text/60">
                    O que ela comunica
                  </h3>
                  <ul className="mt-4 flex flex-col gap-3 text-text">
                    {communicatesItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="border-t border-accent pt-3.5 text-xs uppercase tracking-[0.2em] text-accent">
                    Como ela se comporta
                  </h3>
                  <ul className="mt-4 flex flex-col gap-3 text-text">
                    {behavesItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-10 max-w-xl text-lg text-text/75">
                Nada disso depende de um site grande. Depende de a página ter
                sido pensada para um objetivo, não só para existir.
              </p>
            </section>
          </div>
        </Container>

        {/* CORPO EDITORIAL — bloco 3: quando faz mais sentido + começar pequeno */}
        <Container className={`border-t border-divider py-20 sm:py-24 ${readingGrid} lg:py-28`}>
          <div aria-hidden="true" className="hidden lg:block" />

          <div className="max-w-3xl space-y-20 sm:space-y-24 lg:space-y-28">
            <section id="quando-faz-mais-sentido" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                Quando uma página faz mais sentido que um sistema
              </h2>
              <div className="mt-6 max-w-xl space-y-4 text-lg text-text/75">
                <p>
                  Nem todo problema exige software completo. Uma página pode
                  ser suficiente quando a empresa precisa divulgar algo
                  rapidamente, testar uma oferta, captar contatos, apoiar uma
                  campanha, apresentar um novo serviço ou validar uma ideia
                  antes de investir em uma solução maior.
                </p>
                <p>
                  Quando a operação começa a exigir processos, usuários,
                  regras e integrações mais complexas, aí o próximo passo
                  pode ser um sistema.
                </p>
              </div>

              <div className="mt-16">
                <h3 className="text-xl font-bold leading-snug tracking-[-0.01em] sm:text-2xl">
                  Do primeiro contato ao próximo passo
                </h3>
                <FlowChain steps={contactFlow} className="mt-8" />
                <p className="mt-8 max-w-xl text-text/75">
                  Desenvolvimento web pode ser parte do processo comercial,
                  não só uma entrega visual.
                </p>
              </div>
            </section>

            <section id="comecar-pequeno" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                Começar pequeno
              </h2>
              <p className="mt-5 max-w-xl text-lg text-text/75">
                Uma empresa não precisa esperar ter toda a operação digital
                pronta para começar. Pode começar com uma página.
              </p>
              <FlowChain steps={startSmallFlow} className="mt-10" />
              <p className="mt-10 max-w-xl text-lg text-text/75">
                Site, automação e software não são escolhas separadas. São
                etapas do mesmo caminho.
              </p>
            </section>
          </div>
        </Container>

        {/* MOMENTO DARK — a grande ideia do artigo */}
        <section className="theme-dark border-y border-divider bg-bg text-text py-24 sm:py-32">
          <Container className={readingGrid}>
            <div aria-hidden="true" className="hidden lg:block" />
            <div className="max-w-3xl">
              <div className="mb-6 h-px w-16 bg-accent-2" aria-hidden="true" />
              <p className="text-3xl font-bold leading-[1.15] tracking-[-0.01em] sm:text-5xl lg:text-6xl">
                Uma boa página pode ser{" "}
                <span className="text-accent-2">pequena no desenvolvimento</span>{" "}
                e grande na função que cumpre.
              </p>
              <div className="mt-8 max-w-xl space-y-2 text-lg text-text/70">
                <p>
                  Ela coloca uma oferta no ar. Reduz o tempo entre a ideia e
                  a divulgação. Começa a captar contato antes de qualquer
                  sistema existir.
                </p>
              </div>
              <p className="mt-6 text-2xl font-bold tracking-[-0.01em] text-text sm:text-3xl">
                O primeiro passo não precisa ser grande. Precisa funcionar.
              </p>
            </div>
          </Container>
        </section>

        {/* CORPO EDITORIAL — bloco 4: conclusão + CTA + continue lendo */}
        <Container className={`py-20 sm:py-24 ${readingGrid} lg:py-28`}>
          <div aria-hidden="true" className="hidden lg:block" />

          <div className="max-w-3xl space-y-20 sm:space-y-24">
            <section>
              <div className="max-w-xl space-y-4 text-lg text-text/75">
                <p>Talvez sua empresa não precise de um sistema novo agora.</p>
                <p>Talvez precise apenas de uma forma melhor de apresentar o que já vende.</p>
              </div>

              <h2 className="mt-14 text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                Existe uma oferta que sua empresa ainda não colocou no ar?
              </h2>
              <p className="mt-6 max-w-md text-lg text-text/75">
                O próximo passo pode ser simples: uma página que apresenta
                bem o que você já faz.
              </p>

              <Link href="/#contato" className={`${buttonClasses("primary")} mt-8`}>
                Conversar sobre meu projeto
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </section>

            <section aria-label="Continue lendo" className="border-t border-divider pt-10 sm:pt-12">
              <p className="text-xs uppercase tracking-[0.2em] text-text/60">Continue lendo</p>
              <div className="mt-7 grid gap-8 sm:grid-cols-3 sm:gap-10">
                {relatedArticles.map((article) => (
                  <a
                    key={article.tag}
                    href={article.href ?? "#"}
                    className="block no-underline text-text"
                  >
                    <p className="text-xs uppercase tracking-[0.16em] text-accent">{article.tag}</p>
                    <p className="mt-2.5 text-lg font-semibold leading-snug transition-colors duration-200 hover:text-accent-2">
                      {article.title}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </Container>
      </article>
    </main>
    <Footer />
    </>
  );
}
