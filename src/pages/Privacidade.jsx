import Seo from '../components/Seo.jsx'

const ATUALIZADO = '23 de novembro de 2026'

const SECOES = [
  {
    titulo: '1. Quem somos',
    texto: [
      'Esta política explica como a Fluxo Certo Soluções Financeiras Ltda. ("Fluxo Certo") trata os dados pessoais de quem visita o site fluxocertoconsultoria.com.br, as páginas ligadas a ele (como plano2027.fluxocertoconsultoria.com.br) e de quem entra em contato conosco.',
      'Endereço comercial: Av. Prefeito Carlos Ferreira Lopes, 703, Sala 809, Vila Mogilar, Mogi das Cruzes/SP, CEP 08773-490. Contato para assuntos de privacidade: fluxocertoconsultoria@gmail.com.',
    ],
  },
  {
    titulo: '2. Quais dados coletamos',
    lista: [
      'Dados que você nos envia: nome, telefone, e-mail, nome da empresa e as informações que você compartilha ao conversar conosco pelo WhatsApp, e-mail ou formulários.',
      'Dados de compra: ao contratar um produto ou serviço pela plataforma de pagamento (Kiwify), ela coleta os dados necessários para a cobrança e nos informa nome, e-mail, telefone e o produto adquirido. Não temos acesso aos dados completos do seu cartão.',
      'Informações do seu negócio: no diagnóstico e nos serviços contratados, você pode nos enviar números e documentos da empresa. Eles são usados somente para a prestação do serviço.',
      'Dados de navegação: o site e os anúncios podem registrar informações técnicas, como páginas visitadas, origem do acesso (por exemplo, um anúncio do Google) e tipo de dispositivo, por meio de cookies e ferramentas de medição.',
    ],
  },
  {
    titulo: '3. Para que usamos os dados',
    lista: [
      'Responder ao seu contato e agendar reuniões.',
      'Prestar os serviços contratados, como diagnóstico, consultoria, BPO financeiro e mentorias.',
      'Emitir cobranças, notas fiscais e cumprir obrigações legais e contábeis.',
      'Medir o resultado do site e dos anúncios, para melhorar nossa comunicação.',
      'Enviar conteúdos e convites relacionados aos nossos serviços, quando você tiver autorizado. Você pode pedir para não receber mais a qualquer momento.',
    ],
  },
  {
    titulo: '4. Bases legais',
    texto: [
      'Tratamos dados com base na Lei Geral de Proteção de Dados (Lei nº 13.709/2018), especialmente para executar contratos e procedimentos preliminares a pedido do titular, cumprir obrigações legais, atender nosso legítimo interesse de forma compatível com seus direitos e, quando necessário, com o seu consentimento.',
    ],
  },
  {
    titulo: '5. Com quem compartilhamos',
    texto: [
      'Não vendemos dados pessoais. Compartilhamos apenas o necessário com: plataforma de pagamento (Kiwify); serviços de hospedagem e comunicação (como Cloudflare, Google e WhatsApp/Meta); e, quando você contratar um serviço que envolva parceiros especialistas (por exemplo, contadora, advogado tributarista ou trabalhista), somente as informações necessárias para aquela entrega e com o seu conhecimento. Também podemos compartilhar dados quando exigido por lei ou autoridade competente.',
    ],
  },
  {
    titulo: '6. Por quanto tempo guardamos',
    texto: [
      'Mantemos os dados pelo tempo necessário para as finalidades acima e para cumprir prazos legais, contábeis e fiscais. Depois disso, eles são excluídos ou anonimizados.',
    ],
  },
  {
    titulo: '7. Seus direitos',
    texto: [
      'Você pode, a qualquer momento, pedir: confirmação de que tratamos seus dados, acesso, correção, anonimização, bloqueio ou exclusão de dados desnecessários, portabilidade, informação sobre compartilhamentos e revogação do consentimento. Para isso, escreva para fluxocertoconsultoria@gmail.com. Respondemos no prazo previsto em lei.',
    ],
  },
  {
    titulo: '8. Cookies',
    texto: [
      'Cookies são pequenos arquivos que ajudam o site a funcionar e a medir acessos. Você pode bloqueá-los ou apagá-los nas configurações do seu navegador; algumas funções podem deixar de funcionar.',
    ],
  },
  {
    titulo: '9. Segurança',
    texto: [
      'Adotamos medidas técnicas e administrativas razoáveis para proteger os dados contra acesso não autorizado, perda ou uso indevido. Documentos financeiros de clientes são tratados com sigilo profissional.',
    ],
  },
  {
    titulo: '10. Alterações',
    texto: [
      'Esta política pode ser atualizada. A data da última versão fica sempre no topo desta página.',
    ],
  },
]

export default function Privacidade() {
  return (
    <>
      <Seo
        titulo="Política de Privacidade | Fluxo Certo"
        descricao="Como a Fluxo Certo Soluções Financeiras trata os dados pessoais de quem visita o site e entra em contato."
      />
      <section className="bg-panel py-16 md:py-24">
        <div className="container-fc max-w-3xl">
          <p className="eyebrow">LGPD</p>
          <h1 className="mt-4 text-[34px] leading-tight sm:text-[44px]">Política de Privacidade</h1>
          <p className="mt-3 text-[15px]">Última atualização: {ATUALIZADO}</p>

          <div className="mt-12 space-y-10">
            {SECOES.map((s) => (
              <div key={s.titulo}>
                <h2 className="text-[22px] sm:text-[26px]">{s.titulo}</h2>
                {(s.texto || []).map((p, i) => (
                  <p key={i} className="mt-4 text-[17px] leading-relaxed">
                    {p}
                  </p>
                ))}
                {s.lista ? (
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-[17px] leading-relaxed">
                    {s.lista.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
