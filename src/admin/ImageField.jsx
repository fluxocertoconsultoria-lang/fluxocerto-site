import { useRef, useState } from 'react'
import api from '../lib/api.js'

export default function ImageField({ valor, onChange, rotulo }) {
  const inputRef = useRef(null)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')

  async function aoSelecionar(e) {
    const arquivo = e.target.files?.[0]
    e.target.value = ''
    if (!arquivo) return
    setEnviando(true)
    setErro('')
    try {
      const r = await api.enviarImagem(arquivo)
      onChange(r.url)
    } catch (err) {
      setErro(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div>
      <label className="block text-[13px] font-medium text-slate-600">{rotulo}</label>
      <div className="mt-2 flex items-start gap-4">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
          {valor ? (
            <img src={valor} alt="" className="h-full w-full object-contain" />
          ) : (
            <span className="text-[11px] text-slate-400">sem imagem</span>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <input
            type="text"
            value={valor || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/img/arquivo.png ou https://..."
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-[13px] focus:border-brand focus:outline-none"
          />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={enviando}
              className="rounded-lg bg-brand px-3 py-1.5 text-[13px] font-medium text-white transition hover:bg-brand-dark disabled:opacity-60"
            >
              {enviando ? 'Enviando...' : 'Enviar imagem'}
            </button>
            {valor ? (
              <button
                type="button"
                onClick={() => onChange('')}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] text-slate-600 transition hover:border-red-300 hover:text-red-600"
              >
                Remover
              </button>
            ) : null}
          </div>
          {erro ? <p className="text-[12px] text-red-600">{erro}</p> : null}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={aoSelecionar}
            className="hidden"
          />
        </div>
      </div>
    </div>
  )
}
