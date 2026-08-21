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

for (const rota of ['admin', 'mentoria']) {
  mkdirSync(`dist/${rota}`, { recursive: true })
  writeFileSync(`dist/${rota}/index.html`, variante(rota))
}

// 404.html é o nome reservado que o Pages usa para caminhos sem correspondência.
copyFileSync(origem, 'dist/404.html')

console.log('postbuild: dist/admin/index.html, dist/mentoria/index.html e dist/404.html gerados')
