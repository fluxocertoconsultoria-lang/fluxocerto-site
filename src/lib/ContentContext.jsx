import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import defaultContent from '../content/defaultContent.js'
import api from './api.js'

const ContentContext = createContext({ content: defaultContent, carregando: true })

/** Mescla o conteúdo salvo sobre o padrão, para que campos novos no código
 *  apareçam mesmo se o registro do banco for mais antigo. */
export function mergeContent(base, override) {
  if (override === undefined || override === null) return base
  if (Array.isArray(base)) return Array.isArray(override) ? override : base
  if (typeof base === 'object' && typeof override === 'object' && !Array.isArray(override)) {
    const saida = { ...base }
    for (const chave of Object.keys(base)) {
      saida[chave] = mergeContent(base[chave], override[chave])
    }
    for (const chave of Object.keys(override)) {
      if (!(chave in base)) saida[chave] = override[chave]
    }
    return saida
  }
  return override
}

export function ContentProvider({ children }) {
  const [salvo, setSalvo] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    let ativo = true
    api
      .buscarConteudo()
      .then((r) => ativo && setSalvo(r && r.conteudo ? r.conteudo : null))
      .catch(() => {})
      .finally(() => ativo && setCarregando(false))
    return () => {
      ativo = false
    }
  }, [])

  const valor = useMemo(
    () => ({ content: mergeContent(defaultContent, salvo), carregando, recarregar: setSalvo }),
    [salvo, carregando],
  )

  return <ContentContext.Provider value={valor}>{children}</ContentContext.Provider>
}

export function useContent() {
  return useContext(ContentContext).content
}

export function useContentState() {
  return useContext(ContentContext)
}
