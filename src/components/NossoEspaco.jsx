import Reveal from './Reveal.jsx'

const FOTOS = [
  {
    src: '/img/espaco-sala.jpg',
    alt: 'Graziela Souza na sala de reuniões da Fluxo Certo, em Mogi das Cruzes',
    legenda: 'A sala de reuniões, em Mogi das Cruzes',
  },
  {
    src: '/img/espaco-cliente.jpg',
    alt: 'Graziela em reunião de acompanhamento com uma cliente',
    legenda: 'Reunião de acompanhamento com cliente',
  },
  {
    src: '/img/espaco-workshop.jpg',
    alt: 'Workshop de finanças para empresários na Fluxo Certo',
    legenda: 'Workshop para empresários · out/2026',
  },
]

/** Fotos reais do espaço de trabalho — prova de presença local. */
export default function NossoEspaco() {
  return (
    <section className="bg-panel py-20 md:py-28">
      <div className="container-fc">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Nosso espaço</p>
          <h2 className="mt-4 text-[30px] text-brand sm:text-[40px]">Onde o trabalho acontece</h2>
          <p className="mt-4 text-[17px]">
            Reuniões presenciais em Mogi das Cruzes ou online, sempre com a mesma rotina: olhar os
            números, decidir e acompanhar.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FOTOS.map((f, i) => (
            <Reveal key={f.src} delay={i * 90} as="figure" className={i === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}>
              <img
                src={f.src}
                alt={f.alt}
                width="720"
                height="900"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <figcaption className="mt-3 text-[14px]">{f.legenda}</figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
