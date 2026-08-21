/** Faixa de logos em rolagem contínua (pausa ao passar o mouse). */
export default function LogoMarquee({ logos = [], direcao = 'normal' }) {
  if (!logos.length) return null
  const lista = [...logos, ...logos]

  return (
    <div className="marquee relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
      <div
        className="marquee-track flex w-max items-center gap-14 px-8"
        style={direcao === 'reversa' ? { animationDirection: 'reverse' } : undefined}
      >
        {lista.map((logo, i) => (
          <img
            key={i}
            src={logo.imagem}
            alt={logo.alt || ''}
            className="h-16 w-auto max-w-[170px] shrink-0 object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 md:h-20"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  )
}
