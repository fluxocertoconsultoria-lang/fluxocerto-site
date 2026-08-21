import { useState } from 'react'
import Reveal from './Reveal.jsx'
import Icon from './Icons.jsx'

function Check({ cor }) {
  return (
    <span
      className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
      style={cor ? { backgroundColor: `${cor}26`, color: cor } : undefined}
    >
      <Icon name="check" className={`h-3 w-3 ${cor ? '' : 'text-brand'}`} />
    </span>
  )
}

/** Seção "Parceiros" em formato de slide: foto grande de um lado, descrição do outro.
 *  Troca só por interação do usuário (setas/bolinhas) — sem rotação automática.
 *  Cada parceiro pode definir sua própria cor de marca (`corMarca` + `corFundo`),
 *  usada no card inteiro em vez das cores padrão da Fluxo Certo — útil quando o
 *  parceiro tem identidade visual própria (ex: InovaiHotel). */
export default function ParceirosNegocio({ dados }) {
  if (!dados) return null
  const itens = dados.itens || []
  const [atual, setAtual] = useState(0)

  if (!itens.length) return null
  const indice = Math.min(atual, itens.length - 1)
  const parceiro = itens[indice]
  const ir = (novo) => setAtual((novo + itens.length) % itens.length)

  const temTema = !!parceiro.corFundo
  const corMarca = parceiro.corMarca || ''
  const estiloCard = temTema ? { backgroundColor: parceiro.corFundo } : undefined
  const estiloDestaque = corMarca ? { color: corMarca } : undefined
  const estiloTexto = temTema ? { color: parceiro.corTexto || '#f5f2ee' } : undefined
  const estiloTextoSuave = temTema ? { color: parceiro.corTextoSuave || '#c9c2b6' } : undefined

  return (
    <section className="border-t border-line py-20 md:py-28">
      <div className="container-fc">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{dados.eyebrow}</p>
          <h2 className="mt-4 text-[30px] text-brand sm:text-[40px]">{dados.titulo}</h2>
          <p className="mt-5 text-[16px] leading-relaxed">{dados.texto}</p>
        </Reveal>

        <div
          key={indice}
          className={`reveal is-visible mt-14 overflow-hidden md:grid md:grid-cols-2 ${
            temTema ? '' : 'bg-panel'
          }`}
          style={estiloCard}
        >
          <div className="relative h-64 md:h-full">
            {parceiro.imagem ? (
              <img
                src={parceiro.imagem}
                alt={parceiro.imagemAlt || parceiro.empresa}
                className={`h-full w-full ${
                  parceiro.imagemAjuste === 'contain'
                    ? 'object-contain p-8'
                    : `object-cover ${temTema ? '' : 'bg-brand-soft'}`
                }`}
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-brand/10">
                <Icon name="users" className="h-16 w-16 text-brand/40" />
              </div>
            )}
            {parceiro.logo ? (
              <div
                className={`absolute bottom-4 left-4 inline-flex items-center px-4 py-2.5 ${
                  temTema ? '' : 'bg-ink shadow-lg'
                }`}
              >
                <img
                  src={parceiro.logo}
                  alt={parceiro.logoAlt || parceiro.empresa}
                  className="h-7 w-auto max-w-[180px] object-contain"
                  loading="lazy"
                />
              </div>
            ) : null}
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-10 md:p-12">
            <p
              className={`font-display text-[13px] font-semibold uppercase tracking-[0.25em] ${
                corMarca ? '' : 'text-accent'
              }`}
              style={estiloDestaque}
            >
              Parceiro {indice + 1} de {itens.length}
            </p>
            <h3
              className={`mt-3 font-display text-[24px] leading-snug sm:text-[28px] ${
                corMarca ? '' : 'text-brand'
              }`}
              style={estiloDestaque}
            >
              {parceiro.titulo}
            </h3>
            <p
              className={`mt-1 font-display text-[15px] font-semibold ${temTema ? '' : 'text-ink'}`}
              style={estiloTexto}
            >
              {parceiro.empresa}
            </p>
            <p className="mt-4 text-[16px] leading-relaxed" style={estiloTextoSuave}>
              {parceiro.descricao}
            </p>

            {(parceiro.servicos || []).length ? (
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {parceiro.servicos.slice(0, 6).map((servico, j) => (
                  <li
                    key={j}
                    className={`flex gap-2.5 text-[14px] leading-snug ${temTema ? '' : 'text-ink-soft'}`}
                    style={estiloTexto}
                  >
                    <Check cor={corMarca} />
                    <span>{servico}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {parceiro.botaoLabel ? (
              <a
                href={parceiro.botaoHref}
                target="_blank"
                rel="noreferrer"
                className={temTema ? 'mt-8 inline-flex items-center gap-2 self-start rounded-md px-7 py-3.5 font-display text-[15px] font-semibold text-white transition hover:opacity-85' : 'btn-primary mt-8 self-start'}
                style={temTema ? { backgroundColor: corMarca || '#e85d2b' } : undefined}
              >
                {parceiro.botaoLabel}
              </a>
            ) : null}

            {parceiro.aviso ? (
              <p
                className={`mt-4 text-[12px] leading-relaxed ${temTema ? 'opacity-80' : 'text-muted'}`}
                style={estiloTextoSuave}
              >
                {parceiro.aviso}
              </p>
            ) : null}
          </div>
        </div>

        {itens.length > 1 ? (
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => ir(indice - 1)}
              aria-label="Parceiro anterior"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:border-brand hover:text-brand"
            >
              <Icon name="arrowRight" className="h-4 w-4 rotate-180" />
            </button>
            <div className="flex gap-2.5">
              {itens.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => ir(i)}
                  aria-label={`Ver parceiro ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    i === indice ? 'w-8 bg-brand' : 'w-2.5 bg-brand/20 hover:bg-brand/50'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => ir(indice + 1)}
              aria-label="Próximo parceiro"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:border-brand hover:text-brand"
            >
              <Icon name="arrowRight" className="h-4 w-4" />
            </button>
          </div>
        ) : null}

        {dados.fechamentoTitulo ? (
          <Reveal delay={150} className="mx-auto mt-16 max-w-2xl text-center">
            <h3 className="font-display text-[22px] sm:text-[26px]">{dados.fechamentoTitulo}</h3>
            <p className="mt-4 text-[16px] leading-relaxed">{dados.fechamentoTexto}</p>
            {dados.fechamentoBotaoLabel ? (
              <a
                href={dados.fechamentoBotaoHref}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-7"
              >
                {dados.fechamentoBotaoLabel}
              </a>
            ) : null}
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
