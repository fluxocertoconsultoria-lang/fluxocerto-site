import { useState } from 'react'
import { useContent } from '../lib/ContentContext.jsx'
import Reveal from '../components/Reveal.jsx'
import Seo from '../components/Seo.jsx'
import api from '../lib/api.js'

function Check() {
  return (
    <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m5 13 4 4L19 7" />
      </svg>
    </span>
  )
}

function FormularioAplicacao({ dados }) {
  const [form, setForm] = useState({ nome: '', email: '', whatsapp: '', instagram: '' })
  const [estado, setEstado] = useState({ enviando: false, ok: false, erro: '' })

  const campo = (chave) => ({
    value: form[chave],
    onChange: (e) => setForm((f) => ({ ...f, [chave]: e.target.value })),
    className:
      'w-full rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-[16px] text-white placeholder:text-white/40 focus:border-brand focus:outline-none',
  })

  async function enviar(e) {
    e.preventDefault()
    setEstado({ enviando: true, ok: false, erro: '' })
    try {
      await api.enviarLead({ ...form, origem: 'mentoria' })
      setEstado({ enviando: false, ok: true, erro: '' })
      setForm({ nome: '', email: '', whatsapp: '', instagram: '' })
    } catch (err) {
      setEstado({ enviando: false, ok: false, erro: err.message })
    }
  }

  if (estado.ok) {
    return (
      <div className="rounded-2xl border border-brand/40 bg-brand/10 px-8 py-10 text-center">
        <p className="font-display text-[20px] text-white">{dados.mensagemSucesso}</p>
      </div>
    )
  }

  return (
    <form onSubmit={enviar} className="space-y-4">
      <input required placeholder={dados.campos.nome} autoComplete="name" {...campo('nome')} />
      <input
        required
        type="email"
        placeholder={dados.campos.email}
        autoComplete="email"
        {...campo('email')}
      />
      <input
        required
        placeholder={dados.campos.whatsapp}
        autoComplete="tel"
        inputMode="tel"
        {...campo('whatsapp')}
      />
      <input placeholder={dados.campos.instagram} {...campo('instagram')} />
      {estado.erro ? <p className="text-[15px] text-red-300">{estado.erro}</p> : null}
      <button type="submit" disabled={estado.enviando} className="btn-primary w-full disabled:opacity-60">
        {estado.enviando ? 'Enviando...' : dados.botao}
      </button>
      <p className="text-center text-[14px] text-white/50">{dados.rodape}</p>
    </form>
  )
}

export default function Mentoria() {
  const { mentoria } = useContent()
  const ativa = (secao) => secao?.ativo !== false

  return (
    <>
      <Seo titulo={mentoria.seoTitulo} descricao={mentoria.seoDescricao} imagem={mentoria.hero.imagem} />

      {/* ---------------------------------------------------------- hero */}
      {ativa(mentoria.hero) ? (
        <section className="bg-ink py-16 text-white/75 md:py-24">
          <div className="container-fc grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <Reveal>
              <p className="eyebrow">{mentoria.hero.eyebrow}</p>
              <h1 className="mt-5 text-[34px] leading-[1.15] text-white sm:text-[46px]">
                {mentoria.hero.titulo}
              </h1>
              <p className="mt-5 font-display text-[19px] leading-snug text-brand sm:text-[22px]">
                {mentoria.hero.subtitulo}
              </p>
              <p className="mt-5 text-[17px] leading-relaxed">{mentoria.hero.texto}</p>
              <a href={mentoria.hero.ctaHref} className="btn-primary mt-9">
                {mentoria.hero.ctaLabel}
              </a>
            </Reveal>
            <Reveal delay={120}>
              <img
                src={mentoria.hero.imagem}
                alt={mentoria.hero.imagemAlt}
                className="w-full rounded-[26px] object-cover"
                loading="eager"
              />
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* ------------------------------------------------------- problema */}
      {ativa(mentoria.problema) ? (
        <section className="py-20 md:py-28">
          <div className="container-fc max-w-3xl">
            <Reveal>
              <h2 className="text-[30px] sm:text-[40px]">{mentoria.problema.titulo}</h2>
              <p className="mt-6 text-[17px] leading-relaxed">{mentoria.problema.texto}</p>
            </Reveal>
            <Reveal delay={90}>
              <blockquote className="mt-10 rounded-2xl border-l-4 border-brand bg-brand-soft px-7 py-6 text-[16px] leading-relaxed italic">
                {mentoria.problema.citacao}
              </blockquote>
              <p className="mt-8 font-display text-[19px] leading-snug text-ink">
                {mentoria.problema.fecho}
              </p>
            </Reveal>
            {ativa(mentoria.sobreMentoria) ? (
              <Reveal delay={140} className="mt-8 space-y-4 text-[17px] leading-relaxed">
                <p>{mentoria.sobreMentoria.texto}</p>
                <p>{mentoria.sobreMentoria.texto2}</p>
              </Reveal>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* ------------------------------------------------------ para quem */}
      {ativa(mentoria.paraQuem) ? (
        <section className="bg-brand-soft/60 py-20 md:py-28">
          <div className="container-fc max-w-3xl">
            <Reveal>
              <h2 className="text-[30px] sm:text-[40px]">{mentoria.paraQuem.titulo}</h2>
              <p className="mt-4 font-display text-[19px] text-ink">{mentoria.paraQuem.subtitulo}</p>
            </Reveal>
            <ul className="mt-8 space-y-4">
              {(mentoria.paraQuem.itens || []).map((item, i) => (
                <Reveal
                  as="li"
                  key={i}
                  delay={i * 70}
                  className="flex gap-4 text-[17px] text-ink-soft"
                >
                  <Check />
                  <span>{item.texto}</span>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={120} className="mt-10 space-y-3 text-[17px]">
              <p className="text-ink-soft">❌ {mentoria.paraQuem.naoE}</p>
              <p className="font-display text-ink">✅ {mentoria.paraQuem.sim}</p>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* ------------------------------------------------------- entregas */}
      {ativa(mentoria.entregas) ? (
        <section className="bg-ink py-20 text-white/70 md:py-28">
          <div className="container-fc">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="text-[30px] text-white sm:text-[40px]">{mentoria.entregas.titulo}</h2>
            </Reveal>
            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {(mentoria.entregas.itens || []).map((item, i) => (
                <Reveal
                  key={i}
                  delay={i * 80}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-8"
                >
                  <span className="font-display text-[13px] font-semibold tracking-[0.3em] text-brand">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-display text-[20px] leading-snug text-white">
                    {item.titulo}
                  </h3>
                  {item.texto ? <p className="mt-3 text-[16px]">{item.texto}</p> : null}
                </Reveal>
              ))}
            </div>
            <Reveal delay={200} className="mt-10 text-center font-display text-[18px] text-white">
              {mentoria.entregas.rodape}
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* ------------------------------------------------- direcionamento */}
      {ativa(mentoria.direcionamento) ? (
        <section className="py-20 md:py-28">
          <div className="container-fc max-w-3xl">
            <Reveal>
              <h2 className="text-[30px] sm:text-[40px]">{mentoria.direcionamento.titulo}</h2>
            </Reveal>
            <div className="mt-8 space-y-5 text-[17px] leading-relaxed">
              {(mentoria.direcionamento.paragrafos || []).map((p, i) => (
                <Reveal as="p" key={i} delay={i * 60}>
                  {p}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ---------------------------------------------------------- tipos */}
      {ativa(mentoria.tipos) ? (
        <section className="bg-brand-soft/60 py-20 md:py-28">
          <div className="container-fc">
            <Reveal className="mx-auto max-w-3xl text-center">
              <h2 className="text-[30px] sm:text-[40px]">{mentoria.tipos.titulo}</h2>
              <p className="mt-4 text-[17px]">{mentoria.tipos.subtitulo}</p>
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(mentoria.tipos.itens || []).map((item, i) => (
                <Reveal
                  key={i}
                  delay={i * 70}
                  className="group overflow-hidden rounded-[22px] bg-white"
                >
                  <div className="overflow-hidden">
                    <img
                      src={item.imagem}
                      alt={item.titulo}
                      className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="px-7 py-6 font-display text-[20px]">{item.titulo}</h3>
                </Reveal>
              ))}
            </div>

            <Reveal delay={160} className="mx-auto mt-12 max-w-3xl text-center">
              <p className="text-[17px] leading-relaxed">{mentoria.tipos.rodape}</p>
              <p className="mt-5 inline-block rounded-full bg-accent/25 px-6 py-3 font-display text-[16px] text-ink">
                {mentoria.tipos.aviso}
              </p>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* ----------------------------------------------------- resultados */}
      {ativa(mentoria.resultados) ? (
        <section className="py-20 md:py-24">
          <div className="container-fc max-w-3xl text-center">
            <Reveal>
              <h2 className="text-[28px] sm:text-[36px]">{mentoria.resultados.titulo}</h2>
              <p className="mt-8 font-display text-[30px] leading-tight text-brand sm:text-[42px]">
                {mentoria.resultados.destaque}
              </p>
              <p className="mt-4 text-[17px]">{mentoria.resultados.texto}</p>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* ---------------------------------------------------- depoimentos */}
      {ativa(mentoria.depoimentos) ? (
        <section className="bg-ink py-20 text-white/70 md:py-28">
          <div className="container-fc">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="text-[28px] text-white sm:text-[36px]">
                {mentoria.depoimentos.titulo}
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {(mentoria.depoimentos.itens || []).map((item, i) => (
                <Reveal
                  key={i}
                  delay={i * 80}
                  className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-8"
                >
                  <p className="flex-1 text-[16px] leading-relaxed">“{item.texto}”</p>
                  <div className="mt-7 flex items-center gap-4">
                    {item.foto ? (
                      <img
                        src={item.foto}
                        alt={item.nome}
                        className="h-14 w-14 rounded-full object-cover"
                        loading="lazy"
                      />
                    ) : null}
                    <div>
                      <p className="font-display text-[16px] font-semibold text-white">
                        {item.nome}
                      </p>
                      <p className="text-[14px] text-white/60">{item.cargo}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ----------------------------------------------------- sobre grazi */}
      {ativa(mentoria.sobreGrazi) ? (
        <section className="py-20 md:py-28">
          <div className="container-fc grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <Reveal>
              <img
                src={mentoria.sobreGrazi.imagem}
                alt={mentoria.sobreGrazi.imagemAlt}
                className="w-full rounded-[26px] object-cover"
                loading="lazy"
              />
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-[30px] sm:text-[40px]">{mentoria.sobreGrazi.titulo}</h2>
              <div className="mt-6 space-y-4 text-[17px] leading-relaxed">
                {(mentoria.sobreGrazi.paragrafos || []).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* ------------------------------------------------------ aplicação */}
      {ativa(mentoria.aplicacao) ? (
        <section id="aplicacao" className="bg-ink py-20 text-white/70 md:py-28">
          <div className="container-fc grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <Reveal>
              <h2 className="text-[30px] text-white sm:text-[40px]">{mentoria.aplicacao.titulo}</h2>
              <p className="mt-5 text-[18px] leading-relaxed">{mentoria.aplicacao.subtitulo}</p>
            </Reveal>
            <Reveal delay={100} className="rounded-[26px] border border-white/10 bg-white/[0.04] p-8">
              <FormularioAplicacao dados={mentoria.aplicacao} />
            </Reveal>
          </div>
        </section>
      ) : null}
    </>
  )
}
