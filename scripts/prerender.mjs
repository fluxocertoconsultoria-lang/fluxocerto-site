import { readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

/**
 * Pré-renderização: escreve o HTML de cada página pública dentro de <div id="root">,
 * para que Google, ChatGPT, Perplexity e outros robôs leiam o texto sem rodar JavaScript.
 * O visual não muda: o navegador recebe o mesmo HTML que o React montaria e só "assume" a página.
 *
 * O conteúdo vem do painel (API em produção). Se a API não responder, usa o conteúdo padrão do código.
 */
const SITE = 'https://fluxocertoconsultoria.com.br'
const ROTAS = [
  ['/', 'dist/index.html'],
  ['/mentoria', 'dist/mentoria/index.html'],
  ['/politica-de-privacidade', 'dist/politica-de-privacidade/index.html'],
]

async function buscarConteudo() {
  try {
    const controle = new AbortController()
    const tempo = setTimeout(() => controle.abort(), 8000)
    const resposta = await fetch(`${SITE}/api/content`, { signal: controle.signal })
    clearTimeout(tempo)
    if (!resposta.ok) throw new Error(`status ${resposta.status}`)
    const dados = await resposta.json()
    console.log('prerender: conteúdo do painel carregado')
    return dados && dados.conteudo ? dados.conteudo : null
  } catch (erro) {
    console.warn(`prerender: painel indisponível (${erro.message}); usando conteúdo padrão`)
    return null
  }
}

const servidor = resolve('dist-ssr/entry-server.js')
if (!existsSync(servidor)) {
  console.error('prerender: dist-ssr/entry-server.js não encontrado — rode o build SSR antes.')
  process.exit(1)
}
const { render } = await import(pathToFileURL(servidor).href)
const conteudo = await buscarConteudo()
// JSON seguro dentro de <script>: impede que um texto do painel feche a tag.
const json = JSON.stringify(conteudo).replace(/</g, '\\u003c')

for (const [url, arquivo] of ROTAS) {
  if (!existsSync(arquivo)) {
    console.warn(`prerender: ${arquivo} não existe, pulando`)
    continue
  }
  const html = readFileSync(arquivo, 'utf8')
  if (!html.includes('<div id="root"></div>')) {
    console.warn(`prerender: ${arquivo} sem <div id="root"></div>, pulando`)
    continue
  }
  const corpo = render(url, conteudo)
  const saida = html.replace(
    '<div id="root"></div>',
    `<div id="root">${corpo}</div><script>window.__CONTEUDO__=${json}</script>`,
  )
  writeFileSync(arquivo, saida)
  console.log(`prerender: ${url} → ${arquivo} (${Math.round(corpo.length / 1024)} KB de HTML)`)
}

rmSync('dist-ssr', { recursive: true, force: true })
