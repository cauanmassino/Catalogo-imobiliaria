
# Imobiliária — Catálogo Imobiliário (Astro + Sanity + React + Tailwind + Framer Motion)

## 1. Criar o projeto Astro

```bash
npm create astro@latest imobiliaria-site -- --template minimal --no-install
cd imobiliaria-site
```

Depois, copie os arquivos deste pacote (`src/`, `schemas/`, `astro.config.mjs`,
`tailwind.config.mjs`, `sanity.config.ts`, `package.json`, `.env.example`) para dentro da
pasta do projeto, sobrescrevendo o que for necessário.

## 2. Instalar as integrações do Astro

```bash
npx astro add react
npx astro add tailwind
npx astro add vercel
```

Isso já configura `@astrojs/react`, `@astrojs/tailwind` e o adapter da Vercel automaticamente
no `astro.config.mjs`.

## 3. Instalar as dependências restantes

```bash
npm install framer-motion @sanity/client @sanity/image-url
npm install -D @tailwindcss/line-clamp
```

## 4. Criar e configurar o projeto Sanity

```bash
npm install -D sanity @sanity/vision
npx sanity init
```

Durante o `sanity init`:
- Escolha **"Create new project"**.
- Dataset: `production`.
- Quando perguntar sobre template, escolha **"Clean project with no predefined schemas"**
  (o schema `property.ts` deste pacote já cobre o necessário).

Depois, copie o `projectId` gerado para:
- `sanity.config.ts` (campo `projectId`)
- `.env` (crie a partir do `.env.example`, preenchendo `PUBLIC_SANITY_PROJECT_ID`)

## 5. Rodar o Studio (painel do seu pai) localmente

```bash
npm run sanity
```

Abre em `http://localhost:3333`. Para publicar o Studio numa URL própria e segura
(ex: `imobiliaria.sanity.studio`), rode:

```bash
npm run sanity:deploy
```

## 6. Rodar o site (front-end) localmente

```bash
npm run dev
```

Abre em `http://localhost:4321`.

## 7. Publicar na Vercel (gratuito)

```bash
npm install -g vercel
vercel
```

Na Vercel, configure as variáveis de ambiente (Settings → Environment Variables):
- `PUBLIC_SANITY_PROJECT_ID`
- `PUBLIC_SANITY_DATASET`

### Deploy automático via Webhook do Sanity

No painel do Sanity (sanity.io/manage → seu projeto → API → Webhooks), crie um webhook
apontando para a **Deploy Hook URL** da Vercel (Vercel → Settings → Git → Deploy Hooks).
Assim, toda vez que seu pai publicar ou editar um imóvel no Studio, a Vercel refaz o build
e o site atualiza automaticamente — sem precisar mexer em código.

## Como adicionar uma nova região

As regiões (Águas Claras, Guará, Asa Sul, etc.) são uma **lista fixa** (dropdown) no
formulário do Studio, para evitar erro de digitação.

Para adicionar uma região nova:

1. Abra `schemas/property.ts`
2. Encontre o array `CITY_OPTIONS` no topo do arquivo
3. Adicione uma linha nova, por exemplo:
   ```ts
   { title: 'Ceilândia', value: 'ceilandia' },
   ```
   - `title`: como o nome aparece no Studio e no site (pode ter acento e espaço)
   - `value`: usado na URL, sempre minúsculo, sem acento, sem espaço (use hífen)
4. Salve o arquivo, reinicie o `npm run sanity` e o `npm run dev`

A nova região já aparece automaticamente no dropdown do Studio e, assim que houver pelo
menos um imóvel cadastrado nela, ela aparece na Home e ganha sua própria página
`/imoveis/[regiao]`.

## Design System (Fase 1)

O visual do site segue um sistema de identidade próprio, definido em `tailwind.config.mjs`:

- **Cores**: `ink` (navy profundo, texto/fundo escuro), `paper` (branco quente, fundo claro),
  `brass` (dourado-latão, cor de destaque/CTA/preço), `forest` (verde profundo, WhatsApp/CTAs
  secundários), `mist` (bordas sutis), `slate` (texto secundário).
- **Tipografia**: `Space Grotesk` (títulos), `Inter` (corpo), `IBM Plex Mono` (preços, rótulos,
  dados) — carregadas via Google Fonts no componente `src/components/Seo.astro`.
- **Elemento de assinatura**: o padrão de grade sutil no Hero (`.blueprint-grid`, definido em
  `src/styles/global.css`) remete a uma planta baixa arquitetônica.

Para trocar qualquer cor, edite apenas o `tailwind.config.mjs` — como as páginas usam os nomes
semânticos (`bg-ink`, `text-brass`, etc.) e não valores soltos, a mudança se propaga sozinha
por todo o site.

### Outras melhorias desta fase

- **Skeleton loading**: as imagens dos cards de imóvel mostram um efeito de "brilho" enquanto
  carregam, em vez de ficarem em branco (`PropertyCard.tsx` + classe `.skeleton`).
- **Imagens otimizadas**: `optimizedImage()` em `src/lib/sanity.ts` pede ao Sanity para servir
  automaticamente o melhor formato (AVIF/WebP) e qualidade ajustada — sem precisar gerar
  variantes manualmente.
- **SEO/Open Graph**: componente `Seo.astro` centraliza title, description, canonical, Open
  Graph e Twitter Card em todas as páginas. Já incluí um `public/og-default.jpg` (1200×630px)
  com o visual do design system, usado no preview de link do WhatsApp/redes sociais — sinta-se
  livre para substituir por uma foto real de um imóvel de destaque quando tiver uma boa.
- **Contador animado**: as estatísticas da seção "Sobre nós" contam de 0 até o valor final
  quando entram na tela (`AnimatedCounter.tsx`), respeitando a preferência do usuário por
  "reduzir movimento" no sistema operacional.
- **Acessibilidade**: foco de teclado sempre visível (`:focus-visible` em `global.css`) e
  todas as animações são desativadas automaticamente para quem ativou "reduzir movimento".

## Direção visual "premium" (atualização de Hero e identidade)

- **Hero animado**: fundo escuro (`ink`) com blobs de gradiente animados ("aurora") e uma
  ilustração vetorial original inspirada na arquitetura de Brasília (`BrasiliaSkylineArt.astro`)
  — não é nenhuma foto real, é um desenho próprio, então não tem risco de direito autoral.
- **Barra de busca em glassmorphism** flutuando sobre o Hero.
- **Textura de ruído sutil** (`.noise-texture` em `global.css`) em fundos escuros, pra não
  ficar "chapado".
- **Regiões do DF**: a lista de cidades foi trocada para as regiões administrativas de
  Brasília (Águas Claras, Guará, Asa Sul, etc.), no estilo do site de referência que vocês
  indicaram.

### Como colocar uma foto real de Brasília no Hero (quando tiverem uma com direito de uso)

Por padrão, o Hero usa só gradiente + ilustração vetorial, sem depender de foto nenhuma —
funciona bem assim. Mas se quiserem trocar por uma foto real do Congresso Nacional, Ponte JK,
etc. (foto própria, ou baixada de bancos gratuitos como [Unsplash](https://unsplash.com) ou
[Pexels](https://pexels.com), que permitem uso comercial):

1. Salve a foto em `public/images/hero-brasilia.jpg`
2. No arquivo `src/pages/index.astro`, encontre a seção `<!-- HERO -->` e adicione, logo
   depois de `<section class="relative overflow-hidden bg-ink noise-texture ...">`:
   ```html
   <img
     src="/images/hero-brasilia.jpg"
     alt="Vista de Brasília"
     class="absolute inset-0 w-full h-full object-cover opacity-30"
   />
   ```
3. Ajuste o valor de `opacity-30` conforme necessário pra manter o texto legível por cima.

## Direção visual "Apple/Porsche" (pivot de paleta)

A paleta mudou de "navy escuro dominante" para **off-white predominante**, seguindo o
briefing de referência Apple/Porsche:

- `paper` (off-white) é o fundo predominante na maioria das seções agora — só o Hero da
  Home e um card de destaque na grade de regiões continuam escuros, de propósito, como
  "ponto de contraste" (não a regra).
- `ink` deixou de ser navy e virou um quase-preto neutro (`#161513`), mais alinhado ao
  "preto só para contraste" pedido no briefing.
- `brass` (dourado) é a **única** cor de destaque de marca — usada com moderação em CTAs,
  preço e foco. `forest` (verde) ficou reservado só pro botão de WhatsApp, que é uma cor
  funcional do próprio WhatsApp, não uma segunda cor de marca do site.
- Cards de imóvel ganharam imagem maior, overlay em glassmorphism no hover ("Ver detalhes"
  aparece sobre a foto) e sombra em camadas (sutil em repouso, mais profunda no hover).

### Sobre a foto de drone pedida no Hero

Mesma observação de sempre: não coloquei nenhuma foto de banco de imagem hotlinkada no
código — risco de direito autoral incerto. O Hero já funciona bem sem foto (composição
tipográfica + card flutuante). Quando tiverem uma foto aérea real de Brasília com direito
de uso garantido, o jeito mais simples de encaixar: salve em `public/images/hero-brasilia.jpg`
e adicione um `<img>` full-bleed com `object-cover` como primeiro elemento dentro da
`<section>` do Hero em `src/pages/index.astro`, com `opacity` ajustada pra manter o texto
legível por cima.

## Redesenho estrutural (quebrando o "empilhamento de seções")

Pra parar de parecer seções empilhadas uma embaixo da outra, mudei a **estrutura**, não só
o visual:

- **Hero de tela cheia** (`min-h-screen`), com cue de scroll animado no rodapé e parallax
  real (via scroll) no card flutuante — script em `src/scripts/reveal.ts`.
- **Painel do catálogo sobrepõe o Hero**: a seção `#catalogo` usa margem negativa
  (`-mt-12`/`-mt-16`) e cantos arredondados só no topo, criando a sensação de um painel
  "deslizando por cima" do Hero escuro, em vez de uma borda reta entre seções.
- **Catálogo em vitrine assimétrica**: o primeiro imóvel em destaque ganha um card grande
  (`FeaturedListing.tsx`, 60/40 imagem/informação), os demais em ritmo variado (alguns com
  leve deslocamento vertical), não mais grid uniforme.
- **Sistema de scroll-reveal** (`src/scripts/reveal.ts`, classe `.reveal` no HTML): textos e
  blocos "nascem" suavemente ao entrar na viewport, com atraso escalonado via
  `data-reveal-delay`. Aplicado em todas as três páginas.
- **Atenção**: como o site usa View Transitions (navegação sem reload completo), o script
  escuta o evento `astro:page-load` do Astro para funcionar corretamente também depois de
  navegar entre páginas — não seria suficiente rodar só uma vez no carregamento inicial.

### Sendo direto sobre o que isso é e o que não é

Isso é um redesenho estrutural real, focado em 3 pontos de maior impacto (Hero, sobreposição
Hero→Catálogo, vitrine assimétrica) — não é um retrabalho de "nível Awwwards" em todas as
seções de uma vez, o que exigiria muito mais rodadas de refinamento visual específico
(Regiões, Diferenciais, Sobre, Contato e Footer ainda seguem o padrão de seção mais
tradicional). Se quiser, dá pra aplicar o mesmo tipo de quebra estrutural numa seção
específica por vez daqui pra frente.

## Notas finais

- O formulário de contato (`ContactForm.tsx`) está pronto para usar um serviço gratuito
  como o [Formspree](https://formspree.io) — basta trocar `SEU_ID_AQUI` pela sua URL de
  formulário. Também funciona com uma função serverless da própria Vercel, se preferir.
- Troque o número `5511999999999` (usado nos links de WhatsApp) pelo número real da
  imobiliária em todos os arquivos `.astro` e no `ContactForm.tsx`.
- Lembre de preencher o número de **CRECI** real no rodapé do `index.astro`.
=======
# Catalogo-imobiliaria

