import { useEffect, useState } from 'react'
import Reveal from './Reveal.jsx'

function Estrelas() {
  return (
    <div className="flex gap-1 text-star" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L10 1.5Z" />
        </svg>
      ))}
    </div>
  )
}

export default function Depoimentos({ dados }) {
  const itens = dados?.itens || []
  const [atual, setAtual] = useState(0)

  useEffect(() => {
    if (itens.length < 2) return
    const t = setInterval(() => setAtual((i) => (i + 1) % itens.length), 8000)
    return () => clearInterval(t)
  }, [itens.length])

  if (!itens.length) return null
  const ativo = itens[Math.min(atual, itens.length - 1)]

  return (
    <section className="grid md:grid-cols-2">
      <Reveal className="h-72 md:h-auto">
        <img
          src={dados.imagem}
          alt={dados.imagemAlt || ''}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </Reveal>

      <div className="flex items-center bg-panel px-6 py-16 sm:px-12 md:py-24">
        <Reveal className="w-full max-w-md">
          <h2 className="text-[30px] text-brand sm:text-[36px]">{dados.titulo}</h2>
          <p className="mt-4 text-[16px] leading-relaxed">{dados.texto}</p>

          <div key={atual} className="relative mt-9 bg-brand p-7 text-white sm:p-8">
            <Estrelas />
            <p className="mt-5 text-[16px] leading-relaxed">{ativo.texto}</p>
            <div className="mt-6 flex items-center gap-3">
              {ativo.foto ? (
                <img
                  src={ativo.foto}
                  alt={ativo.nome}
                  className="h-11 w-11 rounded-full object-cover"
                  loading="lazy"
                />
              ) : null}
              <div>
                <p className="font-display text-[15px] font-semibold text-white">{ativo.nome}</p>
                <p className="text-[13px] text-accent">{ativo.cargo}</p>
              </div>
            </div>
            <svg
              viewBox="0 0 24 24"
              className="absolute bottom-6 right-6 h-7 w-7 text-accent/70"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M7.7 6C5.1 7.5 3.5 10.2 3.5 13.3c0 2.7 1.7 4.7 4.1 4.7 2.1 0 3.7-1.6 3.7-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8.1-1 .2.4-1.4 1.6-2.7 3.2-3.6L7.7 6Zm9.1 0c-2.6 1.5-4.2 4.2-4.2 7.3 0 2.7 1.7 4.7 4.1 4.7 2.1 0 3.7-1.6 3.7-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8.1-1 .2.4-1.4 1.6-2.7 3.2-3.6L16.8 6Z" />
            </svg>
          </div>

          {itens.length > 1 ? (
            <div className="mt-6 flex gap-2.5">
              {itens.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setAtual(i)}
                  aria-label={`Depoimento ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    i === atual ? 'w-8 bg-brand' : 'w-2.5 bg-brand/20 hover:bg-brand/50'
                  }`}
                />
              ))}
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  )
}
