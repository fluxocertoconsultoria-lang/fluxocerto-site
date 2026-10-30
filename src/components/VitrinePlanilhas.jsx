import Reveal from './Reveal.jsx'
import Icon from './Icons.jsx'

// Vitrine das planilhas digitais (vendidas na Kiwify). Todo o texto vem de
// home.planilhas em defaultContent.js e pode ser editado no painel.
function Semaforo() {
  return (
    <span className="inline-flex items-center gap-1.5" aria-hidden="true">
      <i className="h-2.5 w-2.5 rounded-full bg-accent" />
      <i className="h-2.5 w-2.5 rounded-full bg-star" />
      <i className="h-2.5 w-2.5 rounded-full bg-[#e5484d]" />
    </span>
  )
}

function CardPlanilha({ item, indice }) {
  const destaque = !!item.destaque
  return (
    <Reveal
      delay={indice * 90}
      className={`flex flex-col border p-7 sm:p-9 ${
        destaque ? 'border-brand bg-brand text-white' : 'border-line bg-white'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <span
          className={`font-display text-[12px] font-semibold uppercase tracking-[0.2em] ${
            destaque ? 'text-white/75' : 'text-brand'
          }`}
        >
          {item.publico}
        </span>
        <Semaforo />
      </div>

      <h3 className={`mt-5 text-[24px] leading-snug sm:text-[28px] ${destaque ? '!text-white' : ''}`}>
        {item.nome}
      </h3>
      <p className={`mt-3 text-[16px] leading-relaxed ${destaque ? 'text-white/80' : 'text-muted'}`}>
        {item.texto}
      </p>

      <ul className="mt-6 grid gap-2.5 text-[15px]">
        {(item.beneficios || []).map((b, i) => (
          <li key={i} className={`flex gap-3 ${destaque ? 'text-white/90' : 'text-ink-soft'}`}>
            <Icon name="check" className={`mt-1 h-4 w-4 shrink-0 ${destaque ? 'text-white' : 'text-accent'}`} />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex-1" />

      <div className={`flex flex-wrap items-end justify-between gap-5 border-t pt-6 ${destaque ? 'border-white/20' : 'border-line'}`}>
        <div>
          <p className={`font-display text-[34px] font-semibold leading-none ${destaque ? 'text-white' : 'text-ink'}`}>
            {item.preco}
          </p>
          <p className={`mt-1.5 text-[13px] ${destaque ? 'text-white/70' : 'text-muted'}`}>{item.precoNota}</p>
        </div>
        <a
          href={item.ctaHref}
          className={destaque ? 'btn-primary !bg-white !text-brand hover:!bg-brand-soft' : 'btn-primary'}
        >
          {item.ctaLabel}
          <Icon name="arrowRight" className="h-4 w-4" />
        </a>
      </div>
    </Reveal>
  )
}

export default function VitrinePlanilhas({ dados }) {
  if (!dados || dados.ativo === false) return null
  return (
    <section id="planilhas" className="bg-brand-soft py-20 md:py-28">
      <div className="container-fc">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{dados.eyebrow}</p>
          <h2 className="mt-4 text-[30px] sm:text-[40px]">{dados.titulo}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed">{dados.texto}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {(dados.itens || []).map((item, i) => (
            <CardPlanilha key={i} item={item} indice={i} />
          ))}
        </div>

        {dados.rodapeTexto ? (
          <Reveal className="mt-10 text-center">
            <a href={dados.rodapeHref} className="font-display text-[15px] font-semibold text-brand hover:underline">
              {dados.rodapeTexto}
            </a>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
