import { NextResponse } from "next/server";

// Nenhum serviço de envio (e-mail, CRM etc.) está configurado ainda. A rota
// existe para o formulário de contato da Home já ter um contrato estável
// para integrar, mas responde 501 de propósito até o envio real existir —
// o formulário nunca deve exibir sucesso sem uma entrega de fato acontecer.
export async function POST() {
  return NextResponse.json({ error: "not_implemented" }, { status: 501 });
}
