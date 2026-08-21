import { useContent } from '../lib/ContentContext.jsx'
import Reveal from '../components/Reveal.jsx'
import Accordion from '../components/Accordion.jsx'
import Seo from '../components/Seo.jsx'
import LogoMarquee from '../components/LogoMarquee.jsx'
import Depoimentos from '../components/Depoimentos.jsx'
import ParceirosNegocio from '../components/ParceirosNegocio.jsx'
import Icon from '../components/Icons.jsx'

function CartaoFlutuante() {
  return (
    <>
      <div className="absolute -right-4 -top-6 hidden w-48 rounded-lg bg-brand p-4 text-white shadow-2xl sm:block sm:w-56">
        <div className="flex items-center justify-between text-[11px] text-white/70">
          <span>Income</span>
          <span className="text-white/50">Total</span>
        </div>
        <p className="mt-1 font-display text-[22px] font-semibold">$102,721</p>
        <svg viewBox="0 0 200 60" className="mt-2 h-12 w-full text-accent">
          <polyline
            points="0,45 30,30 60,38 90,15 120,25 150,10 180,20 200,5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="mt-1 flex justify-between text-[10px] text-white/50">
          <span>Jan</span>
          <span>Mar</span>
          <span>Jun</span>
        </div>
      </div>

      <div className="absolute -bottom-6 -left-6 hidden h-24 w-24 items-center justify-center rounded-lg bg-white p-3 shadow-2xl sm:flex">
        <Icon name="trendUp" className="h-10 w-10 text-brand" />
      </div>
    </>
  )
}

function CardServico({ item, indice }) {
  const destaque = !!item.destaque
  return (
    <Reveal
      delay={indice * 70}
      className={`group card flex flex-col ${destaque ? '!bg-brand !border-brand text-white' : ''}`}
    >
      <span className={`icon-box ${destaque ? '!bg-white !text-brand' : ''}`}>
        <Icon name={item.iconeNome} className="h-6 w-6" />
      </span>
      <h3
        className={`mt-6 border-l-2 pl-3 font-display text-[19px] leading-snug ${
          destaque ? 'border-white text-white' : 'border-accent text-brand'
        }`}
      >
        {item.titulo}
      </h3>
      <p className={`mt-3 text-[15px] leading-relaxed ${destaque ? 'text-white/85' : 'text-muted'}`}>
        {item.texto}
      </p>
      <div className="mt-6 flex-1" />
      <span
        className={`arrow-btn ${destaque ? '!bg-white !text-brand group-hover:!bg-panel' : ''}`}
      >
        <Icon name="arrowRight" className="h-4 w-4" />
      </span>
    </Reveal>
  )
}

export default function Home() {
  const { home } = useContent()

  return (
    <>
      <Seo titulo={home.seoTitulo} descricao={home.seoDescricao} imagem={home.hero.imagem} />

      {/* ---------------------------------------------------------- hero */}
      {home.hero.ativo !== false ? (
        <section className="relative overflow-hidden bg-ink">
          <div className="container-fc grid items-center gap-12 py-16 md:grid-cols-2 md:gap-16 md:py-24">
            <Reveal>
              <p className="eyebrow">{home.hero.eyebrow}</p>
              <h1 className="mt-5 text-[34px] leading-[1.15] text-white sm:text-[44px] lg:text-[52px]">
                {home.hero.titulo} <span className="text-accent">{home.hero.tituloDestaque}</span>
              </h1>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/60 sm:text-[18px]">
                {home.hero.texto}
              </p>
              {home.hero.ctaLabel ? (
                <a
                  href={home.hero.ctaHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary mt-9"
                >
                  {home.hero.ctaLabel}
                  <Icon name="arrowRight" className="h-4 w-4" />
                </a>
              ) : null}
            </Reveal>

            <Reveal delay={120} className="relative mx-auto max-w-sm md:max-w-none">
              <img
                src={home.hero.imagem}
                alt={home.hero.imagemAlt}
                className="aspect-[4/5] w-full object-cover"
                loading="eager"
              />
              <CartaoFlutuante />
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* ------------------------------------------------------ clientes */}
      {home.clientes.ativo !== false ? (
        <section className="border-y border-line bg-panel py-16 md:py-20">
          <div className="container-fc text-center">
            <Reveal>
              <p className="eyebrow">{home.clientes.eyebrow}</p>
              <h2 className="mx-auto mt-4 max-w-2xl text-[28px] sm:text-[36px]">
                {home.clientes.titulo}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[17px]">{home.clientes.texto}</p>
            </Reveal>
          </div>
          <Reveal delay={100} className="mt-12">
            <LogoMarquee logos={home.clientes.logos} />
          </Reveal>
        </section>
      ) : null}

      {/* ---------------------------------------------------- quem somos */}
      {home.quemSomos.ativo !== false ? (
        <section className="py-20 md:py-28">
          <div className="container-fc grid items-center gap-16 md:grid-cols-2 md:gap-16">
            <Reveal className="relative mx-auto max-w-sm md:max-w-none">
              {home.quemSomos.imagemDecorativa ? (
                <img
                  src={home.quemSomos.imagemDecorativa}
                  alt={home.quemSomos.imagemDecorativaAlt || ''}
                  className="absolute -left-6 -top-6 z-10 hidden h-28 w-28 border-4 border-white object-cover shadow-lg sm:block"
                  loading="lazy"
                />
              ) : null}
              <img
                src={home.quemSomos.imagem}
                alt={home.quemSomos.imagemAlt}
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
              {home.quemSomos.statNumero ? (
                <div className="absolute -bottom-6 -right-4 flex flex-col items-center justify-center bg-brand px-6 py-5 text-center text-white shadow-lg sm:right-6">
                  <span className="font-display text-[28px] font-bold leading-none">
                    {home.quemSomos.statNumero}
                  </span>
                  <span className="mt-1 text-[12px] leading-tight">{home.quemSomos.statLabel}</span>
                </div>
              ) : null}
            </Reveal>

            <Reveal delay={100}>
              <p className="eyebrow">{home.quemSomos.eyebrow}</p>
              <h2 className="mt-4 text-[30px] text-brand sm:text-[40px]">{home.quemSomos.titulo}</h2>
              <div className="mt-6 space-y-4 text-[16px] leading-relaxed">
                {(home.quemSomos.paragrafos || []).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <details className="mt-7 border-t border-line pt-5" open>
                <summary className="cursor-pointer font-display text-[16px] font-medium text-brand underline underline-offset-4">
                  {home.quemSomos.missaoTitulo}
                </summary>
                <p className="mt-3 text-[16px] leading-relaxed">{home.quemSomos.missaoTexto}</p>
              </details>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* ------------------------------------------------------ serviços */}
      {home.servicos.ativo !== false ? (
        <section className="bg-white py-20 md:py-28">
          <div className="container-fc">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">{home.servicos.eyebrow}</p>
              <h2 className="mt-4 text-[30px] text-brand sm:text-[40px]">{home.servicos.titulo}</h2>
              <p className="mt-4 text-[17px]">{home.servicos.subtitulo}</p>
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(home.servicos.itens || []).map((item, i) => (
                <CardServico key={i} item={item} indice={i} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* -------------------------------------------------- diferenciais */}
      {home.diferenciais.ativo !== false ? (
        <section className="bg-white pb-20 md:pb-28">
          <div className="container-fc">
            <Reveal className="max-w-2xl">
              <p className="eyebrow">{home.diferenciais.eyebrow}</p>
              <h2 className="mt-4 text-[30px] text-brand sm:text-[40px]">
                {home.diferenciais.titulo}
              </h2>
              <p className="mt-4 text-[17px]">{home.diferenciais.texto}</p>
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {(home.diferenciais.itens || []).map((item, i) => (
                <CardServico key={i} item={item} indice={i} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ------------------------------------------------ parceiros de negócio */}
      {home.parceirosNegocio.ativo !== false ? (
        <ParceirosNegocio dados={home.parceirosNegocio} />
      ) : null}

      {/* ------------------------------------------------------- contato */}
      {home.contatoSecao.ativo !== false ? (
        <section id="contato" className="bg-panel py-20 md:py-28">
          <div className="container-fc">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">{home.contatoSecao.eyebrow}</p>
              <h2 className="mt-4 text-[30px] text-brand sm:text-[40px]">
                {home.contatoSecao.titulo}
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {(home.contatoSecao.cards || []).map((card, i) => (
                <Reveal key={i} delay={i * 90}>
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noreferrer"
                    className="card flex h-full flex-col items-center bg-white text-center"
                  >
                    <img src={card.icone} alt="" className="h-20 w-20 rounded-full object-cover" />
                    <h3 className="mt-6 font-display text-[19px]">{card.titulo}</h3>
                    <p className="mt-2 break-words text-[16px] text-brand">{card.valor}</p>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ---------------------------------------------------- depoimentos */}
      {home.depoimentos.ativo !== false ? <Depoimentos dados={home.depoimentos} /> : null}

      {/* ----------------------------------------------------------- faq */}
      {home.faq.ativo !== false ? (
        <section className="bg-white py-20 md:py-28">
          <div className="container-fc grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow">{home.faq.eyebrow}</p>
              <h2 className="mt-4 text-[30px] text-brand sm:text-[40px]">{home.faq.titulo}</h2>
              <p className="mt-5 text-[16px] leading-relaxed">{home.faq.texto}</p>
              {home.faq.ctaLabel ? (
                <a
                  href={home.faq.ctaHref}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary mt-8"
                >
                  {home.faq.ctaLabel}
                  <Icon name="phone" className="h-4 w-4" />
                </a>
              ) : null}
            </Reveal>
            <Reveal delay={100}>
              <Accordion itens={home.faq.itens} />
            </Reveal>
          </div>
        </section>
      ) : null}
    </>
  )
}
