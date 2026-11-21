import Reveal from './Reveal.jsx'

const VIDEOS = [
  {
    src: '/video/depoimento-anna-destaques.mp4',
    poster: '/video/poster-anna-destaques.jpg',
    nome: 'Anna Júlia',
    cargo: 'Gerente de hotel e restaurante de alto padrão',
    frase: '“Hoje a gente tem muito mais certeza nos números. A gente olha e não está mais no escuro.”',
  },
  {
    src: '/video/depoimento-livia.mp4',
    poster: '/video/poster-livia.jpg',
    nome: 'Lívia',
    cargo: 'Gestora de colégio bilíngue em Mogi das Cruzes',
    frase: '“O fluxo de caixa é um retrato diário da sua empresa.”',
  },
  {
    src: '/video/bastidor-livia.mp4',
    poster: '/video/poster-bastidor.jpg',
    nome: 'Bastidor com a Lívia',
    cargo: 'Reunião de acompanhamento no horário de almoço',
    frase: '“O horário do almoço é sagrado. É quando a gente olha os números da empresa.”',
  },
]

/** Depoimentos em vídeo (legendados), formato vertical. */
export default function DepoimentosVideo() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-fc">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Depoimentos em vídeo</p>
          <h2 className="mt-4 text-[30px] text-brand sm:text-[40px]">
            O antes e o depois, contado por quem viveu
          </h2>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((v, i) => (
            <Reveal key={v.src} delay={i * 90} className="flex flex-col">
              <video
                controls
                playsInline
                preload="none"
                poster={v.poster}
                aria-label={`Vídeo: ${v.nome}, com legendas`}
                className="aspect-[9/16] w-full bg-black object-cover"
              >
                <source src={v.src} type="video/mp4" />
              </video>
              <p className="mt-4 text-[16px] leading-relaxed text-ink">{v.frase}</p>
              <p className="mt-3 font-display text-[15px] font-semibold text-brand">{v.nome}</p>
              <p className="text-[13px]">{v.cargo}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
