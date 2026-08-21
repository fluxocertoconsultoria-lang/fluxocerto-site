import { Link } from 'react-router-dom'
import { useContent } from '../lib/ContentContext.jsx'

const externo = (href) => /^(https?:|mailto:|tel:|#)/.test(href || '')

export default function Footer() {
  const { brand, rodape, contato } = useContent()
  const ano = new Date().getFullYear()

  return (
    <footer className="bg-ink text-white/70">
      <div className="container-fc grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <img
            src={brand.logo}
            alt={brand.logoAlt || brand.nome}
            className="h-11 w-auto brightness-0 invert"
          />
          <p className="mt-6 max-w-sm text-[16px] leading-relaxed">{rodape.descricao}</p>
        </div>

        <div>
          <h4 className="font-display text-[15px] font-semibold uppercase tracking-[0.2em] text-white">
            {rodape.linksTitulo}
          </h4>
          <ul className="mt-5 space-y-3 text-[16px]">
            {(rodape.links || []).map((l, i) => (
              <li key={i}>
                {externo(l.href) ? (
                  <a href={l.href} className="transition hover:text-white">
                    {l.label}
                  </a>
                ) : (
                  <Link to={l.href} className="transition hover:text-white">
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-[15px] font-semibold uppercase tracking-[0.2em] text-white">
            Contato
          </h4>
          <ul className="mt-5 space-y-3 text-[16px]">
            <li>
              <a href={`mailto:${contato.email}`} className="transition hover:text-white">
                {contato.email}
              </a>
            </li>
            <li>
              <a
                href={contato.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
              >
                {contato.whatsapp}
              </a>
            </li>
            <li>
              <a
                href={contato.instagramHref}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
              >
                {contato.instagram}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-fc flex flex-col items-center justify-between gap-2 py-6 text-[14px] sm:flex-row">
          <p>{(rodape.texto || '').replace('©', `© ${ano}`)}</p>
          <Link to="/admin" className="text-white/40 transition hover:text-white/80">
            Painel
          </Link>
        </div>
      </div>
    </footer>
  )
}
