# YZEV Tech

Site institucional da YZEV Tech, construído com Next.js, React, TypeScript e Tailwind CSS.

O projeto está em construção incremental: cada fase é implementada, validada e commitada separadamente. Veja `yzevtech_site_blueprint_e_plano_incremental.md` para o plano completo.

O deploy é feito na Vercel (`vercel.json` já define os cabeçalhos de segurança do site).

## Requisitos

- Node.js `22.12.0` ou superior
- npm

## Instalação

Na raiz do projeto:

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Abra no navegador:

```text
http://localhost:3000
```

## Build de produção

```bash
npm run build
npm run start
```

## Estrutura

```text
src/
  app/          Rotas e layouts (Next.js App Router)
  components/   Componentes reutilizáveis
  content/      Conteúdo (futuramente MDX)
  lib/          Funções e utilidades
  styles/       Estilos globais
public/
  img/          Identidade visual e imagens
```

## Scripts disponíveis

| Comando | Função |
| --- | --- |
| `npm run dev` | Inicia o desenvolvimento local |
| `npm run build` | Gera a versão de produção |
| `npm run start` | Sobe o build de produção localmente |
| `npm run lint` | Executa o ESLint |
| `npm run typecheck` | Verifica os tipos TypeScript |
