import { notFound } from "next/navigation";

// Sem essa rota catch-all, um caminho que não bate com nenhuma página dentro
// de [locale] nunca chega a entrar nessa árvore de rotas — o Next usa o
// fallback genérico da raiz do app em vez do not-found.tsx customizado aqui
// dentro. Isso força a entrada no segmento [locale] e aciona o not-found.tsx
// de verdade.
export default function CatchAll() {
  notFound();
}
