import { useState } from 'react'
import ImageField from './ImageField.jsx'
import { rotuloDe, tipoDoCampo, resumoItem } from './fieldMeta.js'

const inputCls =
  'w-full rounded-lg border border-slate-200 px-3 py-2 text-[14px] text-slate-800 focus:border-brand focus:outline-none'

function CampoTexto({ chave, valor, onChange }) {
  const tipo = tipoDoCampo(chave, valor)
  const rotulo = rotuloDe(chave)

  if (tipo === 'imagem') {
    return <ImageField rotulo={rotulo} valor={valor} onChange={onChange} />
  }

  return (
    <div>
      <label className="block text-[13px] font-medium text-slate-600">{rotulo}</label>
      {tipo === 'textarea' ? (
        <textarea
          value={valor ?? ''}
          rows={Math.min(10, Math.max(3, Math.ceil(String(valor || '').length / 70)))}
          onChange={(e) => onChange(e.target.value)}
          className={`mt-1.5 ${inputCls} leading-relaxed`}
        />
      ) : (
        <input
          type={tipo === 'number' ? 'number' : 'text'}
          value={valor ?? ''}
          onChange={(e) => onChange(tipo === 'number' ? Number(e.target.value) : e.target.value)}
          className={`mt-1.5 ${inputCls}`}
        />
      )}
    </div>
  )
}

function novoItemComoModelo(modelo) {
  if (typeof modelo === 'string') return ''
  if (Array.isArray(modelo)) return []
  if (modelo && typeof modelo === 'object') {
    const vazio = {}
    for (const [k, v] of Object.entries(modelo)) {
      vazio[k] = typeof v === 'string' ? '' : novoItemComoModelo(v)
    }
    return vazio
  }
  return ''
}

function Lista({ chave, valor, onChange }) {
  const [abertos, setAbertos] = useState(() => new Set())
  const itens = valor || []

  const atualizar = (i, novo) => onChange(itens.map((it, idx) => (idx === i ? novo : it)))
  const remover = (i) => onChange(itens.filter((_, idx) => idx !== i))
  const mover = (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= itens.length) return
    const copia = [...itens]
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
    onChange(copia)
  }
  const adicionar = () => {
    const modelo = itens[0] !== undefined ? itens[0] : ''
    onChange([...itens, novoItemComoModelo(modelo)])
    setAbertos((s) => new Set(s).add(itens.length))
  }
  const alternar = (i) =>
    setAbertos((s) => {
      const novo = new Set(s)
      novo.has(i) ? novo.delete(i) : novo.add(i)
      return novo
    })

  return (
    <div>
      <div className="flex items-center justify-between">
        <h4 className="text-[13px] font-semibold uppercase tracking-wide text-slate-500">
          {rotuloDe(chave)}{' '}
          <span className="font-normal normal-case text-slate-400">({itens.length})</span>
        </h4>
        <button
          type="button"
          onClick={adicionar}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-[13px] font-medium text-slate-700 transition hover:border-brand hover:text-brand"
        >
          + Adicionar
        </button>
      </div>

      <div className="mt-3 space-y-2">
        {itens.map((item, i) => {
          const aberto = abertos.has(i)
          const simples = typeof item !== 'object' || item === null
          return (
            <div key={i} className="rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center gap-2 px-3 py-2.5">
                {simples ? (
                  <input
                    value={item ?? ''}
                    onChange={(e) => atualizar(i, e.target.value)}
                    className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-[14px] focus:border-brand focus:outline-none"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => alternar(i)}
                    className="min-w-0 flex-1 truncate text-left text-[14px] font-medium text-slate-700"
                  >
                    <span className="mr-2 text-slate-400">{aberto ? '▾' : '▸'}</span>
                    {resumoItem(item, i)}
                  </button>
                )}
                <div className="flex shrink-0 items-center gap-1 text-slate-400">
                  <button
                    type="button"
                    onClick={() => mover(i, -1)}
                    disabled={i === 0}
                    title="Mover para cima"
                    className="rounded px-2 py-1 hover:bg-slate-100 disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => mover(i, 1)}
                    disabled={i === itens.length - 1}
                    title="Mover para baixo"
                    className="rounded px-2 py-1 hover:bg-slate-100 disabled:opacity-30"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Remover este item?')) remover(i)
                    }}
                    title="Remover"
                    className="rounded px-2 py-1 hover:bg-red-50 hover:text-red-600"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {!simples && aberto ? (
                <div className="space-y-4 border-t border-slate-100 px-4 py-4">
                  <Editor valor={item} onChange={(novo) => atualizar(i, novo)} />
                </div>
              ) : null}
            </div>
          )
        })}
        {itens.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-200 px-4 py-6 text-center text-[13px] text-slate-400">
            Nenhum item. Use “Adicionar”.
          </p>
        ) : null}
      </div>
    </div>
  )
}

/** Editor genérico: monta o formulário a partir da forma do objeto de conteúdo.
 *  `ocultar`: chaves de nível superior que não devem virar campo (ex: "ativo",
 *  que já tem um controle dedicado no cabeçalho da seção). */
export default function Editor({ valor, onChange, nivel = 0, ocultar = [] }) {
  if (valor === null || valor === undefined) return null

  return (
    <div className="space-y-5">
      {Object.entries(valor)
        .filter(([chave]) => !ocultar.includes(chave))
        .map(([chave, campo]) => {
        const set = (novo) => onChange({ ...valor, [chave]: novo })

        if (Array.isArray(campo)) {
          return <Lista key={chave} chave={chave} valor={campo} onChange={set} />
        }

        if (campo && typeof campo === 'object') {
          return (
            <fieldset
              key={chave}
              className="rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-4"
            >
              <legend className="px-1 text-[13px] font-semibold uppercase tracking-wide text-slate-500">
                {rotuloDe(chave)}
              </legend>
              <div className="mt-2">
                <Editor valor={campo} onChange={set} nivel={nivel + 1} />
              </div>
            </fieldset>
          )
        }

        if (typeof campo === 'boolean') {
          return (
            <label key={chave} className="flex items-center gap-3 text-[14px] text-slate-700">
              <input
                type="checkbox"
                checked={campo}
                onChange={(e) => set(e.target.checked)}
                className="h-4 w-4"
              />
              {rotuloDe(chave)}
            </label>
          )
        }

        return <CampoTexto key={chave} chave={chave} valor={campo} onChange={set} />
      })}
    </div>
  )
}
