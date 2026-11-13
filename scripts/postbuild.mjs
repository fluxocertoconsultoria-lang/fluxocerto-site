import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'

/**
 * Gera cópias do index.html para as rotas do SPA, como diretório + index.html
 * (ex: dist/admin/index.html serve nativamente em /admin e /admin/).
 *
 * Por quê não usar `_redirects` com status 200 para isso: o Cloudflare Pages
 * aplica seu próprio "clean URLs" (remove `.html`, adiciona barra final) em
 * cima do arquivo de destino da regra, e isso conflita com a reescrita —
 * o resultado observado foi um 308 permanente de volta para o mesmo caminho.
 * Servir cada rota como diretório com `index.html` é o padrão nativamente
 * suportado (mesmo mecanismo da rota `/`) e não sofre esse problema.
 */
const origem = 'dist/index.html'
if (!existsSync(origem)) {
  console.error('postbuild: dist/index.html não encontrado — rode `vite build` antes.')
  process.exit(1)
}

const base = readFileSync(origem, 'utf8')
const variante = (nome) => base.replace('</head>', `<!-- rota:${nome} --></head>`)

// Ajustes de SEO por rota no HTML estático (o que o Google lê antes do JavaScript).
const ajustes = {
  admin: (html) =>
    html
      .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, '')
      .replace('</head>', '<meta name="robots" content="noindex, nofollow" /></head>'),
  mentoria: (html) =>
    html
      .replace(/<title>[^<]*<\/title>/, '<title>Mentoria Do Caos ao Lucro | Fluxo Certo</title>')
      .replace(
        /(<meta\s+name="description"\s+content=")[^"]*(")/,
        '$1Descubra em 2 horas se o seu hotel realmente tem lucro. Mentoria Do Caos ao Lucro, com diagnóstico financeiro, fluxo de caixa com DRE e plano de ação.$2',
      )
      .replace('href="https://fluxocertoconsultoria.com.br/" />', 'href="https://fluxocertoconsultoria.com.br/mentoria" />'),
}

for (const rota of ['admin', 'mentoria']) {
  mkdirSync(`dist/${rota}`, { recursive: true })
  writeFileSync(`dist/${rota}/index.html`, ajustes[rota](variante(rota)))
}

// 404.html é o nome reservado que o Pages usa para caminhos sem correspondência.
writeFileSync('dist/404.html', base.replace('</head>', '<meta name="robots" content="noindex" /></head>'))

console.log('postbuild: dist/admin/index.html, dist/mentoria/index.html e dist/404.html gerados')
