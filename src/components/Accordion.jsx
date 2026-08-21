import { useState } from 'react'
import Icon from './Icons.jsx'

export default function Accordion({ itens = [], inicial = 0 }) {
  const [aberto, setAberto] = useState(inicial)

  return (
    <div className="space-y-2.5">
      {itens.map((item, i) => {
        const ativo = aberto === i
        return (
          <div key={i} className={ativo ? 'bg-brand text-white' : 'bg-panel text-ink'}>
            <h3>
              <button
                type="button"
                onClick={() => setAberto(ativo ? -1 : i)}
                aria-expanded={ativo}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
              >
                <span
                  className={`font-display text-[16px] font-medium underline decoration-1 underline-offset-4 sm:text-[17px] ${
                    ativo ? 'text-white' : 'text-brand'
                  }`}
                >
                  {item.pergunta}
                </span>
                <span className={ativo ? 'text-white' : 'text-accent'}>
                  <Icon
                    name="chevronDown"
                    className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                      ativo ? 'rotate-180' : ''
                    }`}
                  />
                </span>
              </button>
            </h3>
            <div
              className={`grid transition-all duration-300 ${
                ativo ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p
                  className={`px-6 pb-6 text-[16px] leading-relaxed ${
                    ativo ? 'text-white/85' : 'text-muted'
                  }`}
                >
                  {item.resposta}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
