import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useContent } from '../lib/ContentContext.jsx'

const externo = (href) => /^(https?:|mailto:|tel:|#)/.test(href || '')

export default function Header() {
  const { brand, nav } = useContent()
  const [aberto, setAberto] = useState(false)
  const [fixo, setFixo] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setAberto(false), [pathname])

  useEffect(() => {
    const aoRolar = () => setFixo(window.scrollY > 12)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [aberto])

  const itens = nav.itens || []

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        fixo ? 'bg-ink/95 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.8)] backdrop-blur' : 'bg-ink'
      }`}
    >
      <div className="container-fc flex h-20 items-center justify-between gap-6 md:h-24">
        <Link to="/" className="flex shrink-0 items-center" aria-label={brand.nome}>
          <img src={brand.logoClaro || '/img/logo-branco.png'} alt={brand.logoAlt || brand.nome} className="h-7 w-auto md:h-8" />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {itens.map((item, i) =>
            externo(item.href) ? (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="font-display text-[15px] font-medium text-white/85 transition hover:text-accent"
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={i}
                to={item.href}
                className={({ isActive }) =>
                  `font-display text-[15px] font-medium transition hover:text-accent ${
                    isActive ? 'text-accent' : 'text-white/85'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          {nav.ctaLabel ? (
            <a
              href={nav.ctaHref}
              target="_blank"
              rel="noreferrer"
              className="btn-primary hidden !px-6 !py-3 !text-[14px] sm:inline-flex"
            >
              {nav.ctaLabel}
            </a>
          ) : null}

          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-label="Abrir menu"
            aria-expanded={aberto}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white md:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-current transition-all ${
                  aberto ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-current transition-opacity ${
                  aberto ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-current transition-all ${
                  aberto ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* menu mobile */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-ink transition-[max-height] duration-300 md:hidden ${
          aberto ? 'max-h-96' : 'max-h-0 border-t-0'
        }`}
      >
        <nav className="container-fc flex flex-col gap-1 py-4">
          {itens.map((item, i) =>
            externo(item.href) ? (
              <a key={i} href={item.href} className="py-3 font-display text-white">
                {item.label}
              </a>
            ) : (
              <Link key={i} to={item.href} className="py-3 font-display text-white">
                {item.label}
              </Link>
            ),
          )}
          {nav.ctaLabel ? (
            <a href={nav.ctaHref} target="_blank" rel="noreferrer" className="btn-primary mt-3">
              {nav.ctaLabel}
            </a>
          ) : null}
        </nav>
      </div>
    </header>
  )
}
