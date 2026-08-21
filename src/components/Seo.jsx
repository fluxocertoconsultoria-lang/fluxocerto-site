import { useEffect } from 'react'

function metaTag(atributo, valor) {
  let tag = document.head.querySelector(`meta[${atributo}="${valor}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(atributo, valor)
    document.head.appendChild(tag)
  }
  return tag
}

/** Atualiza título e metatags — os textos vêm do painel admin. */
export default function Seo({ titulo, descricao, imagem }) {
  useEffect(() => {
    if (titulo) document.title = titulo
    if (descricao) {
      metaTag('name', 'description').setAttribute('content', descricao)
      metaTag('property', 'og:description').setAttribute('content', descricao)
    }
    if (titulo) metaTag('property', 'og:title').setAttribute('content', titulo)
    metaTag('property', 'og:type').setAttribute('content', 'website')
    metaTag('property', 'og:url').setAttribute('content', window.location.href)
    if (imagem) {
      const url = imagem.startsWith('http') ? imagem : window.location.origin + imagem
      metaTag('property', 'og:image').setAttribute('content', url)
    }
  }, [titulo, descricao, imagem])

  return null
}
