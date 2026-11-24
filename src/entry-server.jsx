import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App.jsx'

/** Gera o HTML de uma rota no build, para buscadores e IAs lerem o texto sem JavaScript. */
export function render(url, conteudoInicial) {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App conteudoInicial={conteudoInicial} />
      </StaticRouter>
    </React.StrictMode>,
  )
}
