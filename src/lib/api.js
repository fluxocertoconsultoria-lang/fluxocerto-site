async function pedido(url, options = {}) {
  const resposta = await fetch(url, {
    credentials: 'same-origin',
    ...options,
    headers: {
      ...(options.body && !(options.body instanceof FormData)
        ? { 'content-type': 'application/json' }
        : {}),
      ...(options.headers || {}),
    },
  })
  const tipo = resposta.headers.get('content-type') || ''
  const dados = tipo.includes('application/json') ? await resposta.json() : null
  if (!resposta.ok) {
    throw new Error((dados && dados.erro) || `Falha na requisição (${resposta.status})`)
  }
  return dados
}

const api = {
  buscarConteudo: () => pedido('/api/content'),
  salvarConteudo: (conteudo) =>
    pedido('/api/content', { method: 'PUT', body: JSON.stringify({ conteudo }) }),
  entrar: (senha) => pedido('/api/login', { method: 'POST', body: JSON.stringify({ senha }) }),
  sair: () => pedido('/api/logout', { method: 'POST' }),
  sessao: () => pedido('/api/me'),
  enviarImagem: (arquivo) => {
    const form = new FormData()
    form.append('arquivo', arquivo)
    return pedido('/api/upload', { method: 'POST', body: form })
  },
  listarMidias: () => pedido('/api/media'),
  removerMidia: (key) => pedido(`/api/media/${encodeURIComponent(key)}`, { method: 'DELETE' }),
  listarLeads: () => pedido('/api/leads'),
  enviarLead: (dados) => pedido('/api/leads', { method: 'POST', body: JSON.stringify(dados) }),
}

export default api
