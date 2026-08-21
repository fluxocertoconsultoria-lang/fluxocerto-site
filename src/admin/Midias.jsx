import { useCallback, useEffect, useRef, useState } from 'react'
import api from '../lib/api.js'

const formatarTamanho = (b) =>
  b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.round((b || 0) / 1024)} KB`

export default function Midias() {
  const [itens, setItens] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [copiado, setCopiado] = useState('')
  const inputRef = useRef(null)

  const carregar = useCallback(() => {
    setCarregando(true)
    api
      .listarMidias()
      .then((r) => setItens(r.itens || []))
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false))
  }, [])

  useEffect(carregar, [carregar])

  async function enviar(e) {
    const arquivos = [...(e.target.files || [])]
    e.target.value = ''
    setErro('')
    for (const arquivo of arquivos) {
      try {
        await api.enviarImagem(arquivo)
      } catch (err) {
        setErro(err.message)
      }
    }
    carregar()
  }

  async function remover(key) {
    if (!confirm('Excluir esta imagem? Ela sumirá de qualquer lugar onde estiver em uso.')) return
    try {
      await api.removerMidia(key)
      carregar()
    } catch (err) {
      setErro(err.message)
    }
  }

  function copiar(url) {
    navigator.clipboard?.writeText(url)
    setCopiado(url)
    setTimeout(() => setCopiado(''), 2000)
  }

  return (
    <div className="mx-auto max-w-[1400px] px-5 py-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-[20px] text-slate-900">Imagens</h2>
            <p className="mt-1 text-[13px] text-slate-500">
              Enviadas pelo painel e guardadas no R2. Copie o link para usar em qualquer campo de
              imagem.
            </p>
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-lg bg-brand px-4 py-2.5 text-[14px] font-semibold text-white transition hover:bg-brand-dark"
          >
            Enviar imagens
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={enviar}
            className="hidden"
          />
        </div>

        {erro ? <p className="mt-4 text-[13px] text-red-600">{erro}</p> : null}

        {carregando ? (
          <p className="mt-8 text-[14px] text-slate-500">Carregando...</p>
        ) : itens.length === 0 ? (
          <p className="mt-8 rounded-xl border border-dashed border-slate-200 px-6 py-12 text-center text-[14px] text-slate-400">
            Nenhuma imagem enviada ainda. As imagens originais do site continuam disponíveis em
            <code className="mx-1 rounded bg-slate-100 px-1.5 py-0.5">/img/</code>.
          </p>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {itens.map((item) => (
              <div key={item.key} className="rounded-xl border border-slate-200 p-3">
                <div className="flex h-28 items-center justify-center overflow-hidden rounded-lg bg-slate-50">
                  <img src={item.url} alt={item.nome} className="h-full w-full object-contain" />
                </div>
                <p className="mt-2 truncate text-[12px] text-slate-600" title={item.nome}>
                  {item.nome}
                </p>
                <p className="text-[11px] text-slate-400">{formatarTamanho(item.tamanho)}</p>
                <div className="mt-2 flex gap-1">
                  <button
                    type="button"
                    onClick={() => copiar(item.url)}
                    className="flex-1 rounded-md border border-slate-200 px-2 py-1 text-[12px] text-slate-600 hover:border-brand hover:text-brand"
                  >
                    {copiado === item.url ? 'Copiado!' : 'Copiar link'}
                  </button>
                  <button
                    type="button"
                    onClick={() => remover(item.key)}
                    className="rounded-md border border-slate-200 px-2 py-1 text-[12px] text-slate-500 hover:border-red-300 hover:text-red-600"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
