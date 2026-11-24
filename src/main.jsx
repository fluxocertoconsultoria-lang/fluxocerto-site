import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Conteúdo usado na pré-renderização (injetado no HTML pelo scripts/prerender.mjs).
const conteudoInicial = typeof window !== 'undefined' ? window.__CONTEUDO__ || null : null

const raiz = document.getElementById('root')
const arvore = (
  <React.StrictMode>
    <BrowserRouter>
      <App conteudoInicial={conteudoInicial} />
    </BrowserRouter>
  </React.StrictMode>
)

// Páginas pré-renderizadas já chegam com o HTML pronto: o React só "assume" a página.
if (raiz.hasChildNodes()) hydrateRoot(raiz, arvore)
else createRoot(raiz).render(arvore)
