# YZEV Tech

Site institucional da YZEV Tech, construído com Astro e HTML, CSS e JavaScript estáticos.

## Antes de publicar

- **Formulário de contato**: configurado com a chave do Web3Forms em [public/js/form.js](public/js/form.js).
- **Analytics**: configurado com o token do Cloudflare Web Analytics em [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro).

O deploy é feito na Vercel (`vercel.json` já define os cabeçalhos de segurança do site).

## Requisitos

- Node.js `22.12.0` ou superior
- npm

## Instalação

Na raiz do projeto:

```powershell
npm.cmd install
```

## Iniciar o Astro

Para iniciar o servidor de desenvolvimento:

```powershell
npm.cmd run dev
```

Abra no navegador:

```text
http://localhost:4321
```

O Astro atualiza a página automaticamente enquanto os arquivos são editados.

## Build de produção

```powershell
npm.cmd run build
```

Os arquivos finais são gerados na pasta `dist/`.

Para visualizar o build localmente:

```powershell
npm.cmd run preview
```

## Rotas

- `/`: página principal
- `/cases/`: lista de Cases
- `/cases/:slug/`: página específica de um projeto

## Adicionar um Case

Edite `src/data/projects.js` e adicione somente informações reais e aprovadas:

```js
{
  slug: 'meu-projeto',
  title: 'Meu Projeto',
  category: 'Produto Digital',
  description: 'Descrição real do projeto.',
  image: '/img/meu-projeto.png',
}
```

A rota será gerada automaticamente em `/cases/meu-projeto/` durante o build.

## Estrutura

```text
src/
  components/       Componentes reutilizáveis
  data/              Dados dos Cases
  layouts/           Layout global
  pages/             Páginas Astro e rotas dinâmicas
public/
  css/               Estilos
  img/               Identidade visual e imagens
  js/                Interações e formulário
```

## Scripts disponíveis

| Comando | Função |
| --- | --- |
| `npm.cmd run dev` | Inicia o desenvolvimento local |
| `npm.cmd run build` | Gera a versão de produção |
| `npm.cmd run preview` | Visualiza a versão gerada |
| `npm.cmd run astro` | Executa a CLI do Astro |

Em macOS ou Linux, use `npm` no lugar de `npm.cmd`.
