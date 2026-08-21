/** Rótulos amigáveis por nome de campo (usado pelo editor automático). */
export const rotulos = {
  brand: 'Marca',
  nav: 'Menu',
  contato: 'Contato',
  home: 'Página Início',
  mentoria: 'Página Mentoria',
  rodape: 'Rodapé',

  nome: 'Nome',
  logo: 'Logotipo',
  logoAlt: 'Texto alternativo do logo',
  itens: 'Itens',
  label: 'Rótulo',
  href: 'Link',
  ctaLabel: 'Texto do botão',
  ctaHref: 'Link do botão',
  email: 'E-mail',
  whatsapp: 'WhatsApp',
  whatsappHref: 'Link do WhatsApp',
  instagram: 'Instagram',
  instagramHref: 'Link do Instagram',

  seoTitulo: 'Título da aba / Google',
  seoDescricao: 'Descrição para Google e redes',

  hero: 'Topo (hero)',
  clientes: 'Clientes (logotipos)',
  quemSomos: 'Quem somos',
  servicos: 'O que fazemos',
  diferenciais: 'Diferenciais',
  contatoSecao: 'Seção de contato',
  parceirosNegocio: 'Parceiros de negócio',
  depoimentos: 'Depoimentos',
  faq: 'Perguntas frequentes',
  problema: 'Bloco do problema',
  sobreMentoria: 'Sobre a mentoria',
  paraQuem: 'Para quem é',
  entregas: 'O que vai receber',
  direcionamento: 'Direcionamento',
  tipos: 'Tipos de hotel',
  resultados: 'Resultados',
  sobreGrazi: 'Sobre a Grazi',
  aplicacao: 'Formulário de aplicação',
  campos: 'Campos do formulário',

  eyebrow: 'Chapéu (texto pequeno acima)',
  titulo: 'Título',
  subtitulo: 'Subtítulo',
  texto: 'Texto',
  texto2: 'Texto (2º parágrafo)',
  paragrafos: 'Parágrafos',
  descricao: 'Descrição',
  imagem: 'Imagem',
  imagemAlt: 'Texto alternativo da imagem',
  imagemSecundaria: 'Imagem secundária',
  imagemSecundariaAlt: 'Texto alternativo (secundária)',
  imagemFundo: 'Imagem de fundo',
  icone: 'Ícone',
  foto: 'Foto',
  alt: 'Texto alternativo',
  cards: 'Cartões',
  valor: 'Valor exibido',
  logos: 'Logotipos',
  cargo: 'Cargo / empresa',
  categoria: 'Categoria',
  pergunta: 'Pergunta',
  resposta: 'Resposta',
  missaoTitulo: 'Título da missão',
  missaoTexto: 'Texto da missão',
  citacao: 'Citação',
  fecho: 'Texto de fechamento',
  rodape: 'Texto de rodapé',
  aviso: 'Aviso',
  destaque: 'Destaque',
  naoE: 'Não é para...',
  sim: 'É para...',
  botao: 'Texto do botão',
  mensagemSucesso: 'Mensagem de sucesso',
  links: 'Links',
  linksTitulo: 'Título da coluna de links',

  empresa: 'Nome da empresa/escritório',
  botaoLabel: 'Texto do botão',
  botaoHref: 'Link do botão (WhatsApp)',
  fechamentoTitulo: 'Título de fechamento',
  fechamentoTexto: 'Texto de fechamento',
  fechamentoBotaoLabel: 'Texto do botão de fechamento',
  fechamentoBotaoHref: 'Link do botão de fechamento',

  tituloDestaque: 'Título (parte destacada)',
  imagemDecorativa: 'Imagem decorativa (pequena)',
  imagemDecorativaAlt: 'Texto alternativo (decorativa)',
  statNumero: 'Número do destaque (ex: 22+)',
  statLabel: 'Legenda do destaque',
  iconeNome: 'Ícone (nome)',
  destaque: 'Destacar este card (cor sólida)',
  ativo: 'Seção ativa (visível no site)',
  imagemAjuste: 'Ajuste da imagem ("cover" preenche, "contain" mostra inteira)',
  corFundo: 'Cor de fundo do card (código hexadecimal, ex: #0c0b0a)',
  corMarca: 'Cor de destaque da marca (código hexadecimal, ex: #e85d2b)',
  corTexto: 'Cor do texto principal (código hexadecimal)',
  corTextoSuave: 'Cor do texto secundário (código hexadecimal)',
}

const CHAVES_IMAGEM = /(imagem|imagemfundo|foto|logo|icone|capa|banner|avatar)/i
// `iconeNome` guarda o NOME de um ícone (ex: "dollar"), não um caminho de
// imagem — precisa ficar de fora da detecção acima, que é por substring.
const CHAVES_IMAGEM_EXCECAO = /^iconeNome$/i
const CHAVES_LONGAS = /(texto|paragrafo|descricao|resposta|citacao|mensagem|seodescricao|fecho|aviso)/i
// Campos "cor*" guardam um código hex curto — nunca viram textarea, mesmo
// contendo a substring "texto" (ex: corTexto, corTextoSuave).
const CHAVES_LONGAS_EXCECAO = /^cor[A-Z]/
const CHAVES_LINK = /(href|url|link)$/i

export function rotuloDe(chave) {
  if (rotulos[chave]) return rotulos[chave]
  const legivel = String(chave)
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
  return legivel.charAt(0).toUpperCase() + legivel.slice(1)
}

export function tipoDoCampo(chave, valor) {
  if (typeof valor === 'boolean') return 'boolean'
  if (typeof valor === 'number') return 'number'
  if (CHAVES_IMAGEM.test(chave) && !CHAVES_IMAGEM_EXCECAO.test(chave) && !/alt$/i.test(chave))
    return 'imagem'
  if (CHAVES_LINK.test(chave)) return 'link'
  if (CHAVES_LONGAS_EXCECAO.test(chave)) return 'texto'
  if (CHAVES_LONGAS.test(chave) || String(valor || '').length > 90) return 'textarea'
  return 'texto'
}

/** Rótulo curto de um item de lista, para exibir no cabeçalho do card. */
export function resumoItem(item, indice) {
  if (typeof item === 'string') return item.slice(0, 70) || `Item ${indice + 1}`
  if (item && typeof item === 'object') {
    for (const chave of ['titulo', 'label', 'pergunta', 'nome', 'alt', 'texto']) {
      if (item[chave]) return String(item[chave]).slice(0, 70)
    }
  }
  return `Item ${indice + 1}`
}
