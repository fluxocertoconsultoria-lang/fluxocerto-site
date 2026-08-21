import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api.js'
import defaultContent from '../content/defaultContent.js'
import { mergeContent } from '../lib/ContentContext.jsx'
import Editor from './Editor.jsx'
import Midias from './Midias.jsx'
import Leads from './Leads.jsx'
import { rotuloDe } from './fieldMeta.js'

const GRUPOS = [
  { id: 'geral', titulo: 'Geral', chaves: ['brand', 'nav', 'contato', 'rodape'] },
  { id: 'home', titulo: 'Página Início', raiz: 'home' },
  { id: 'mentoria', titulo: 'Página Mentoria', raiz: 'mentoria' },
]

/** Divide uma página em subseções editáveis; os campos soltos viram "Geral da página". */
function subsecoes(objeto) {
  const primitivos = []
  const grupos = []
  for (const [chave, valor] of Object.entries(objeto || {})) {
    if (valor && typeof valor === 'object') grupos.push(chave)
    else primitivos.push(chave)
  }
  return { primitivos, grupos }
}

function Switch({ ligado, onChange, titulo }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={ligado}
      title={titulo}
      onClick={(e) => {
        e.stopPropagation()
        onChange(!ligado)
      }}
      className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
        ligado ? 'bg-brand' : 'bg-slate-300'
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
          ligado ? 'translate-x-[18px]' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

function Login({ aoEntrar }) {
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function enviar(e) {
    e.preventDefault()
    setEnviando(true)
    setErro('')
    try {
      await api.entrar(senha)
      aoEntrar()
    } catch (err) {
      setErro(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-5">
      <form
        onSubmit={enviar}
        className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
      >
        <img src="/img/logo.png" alt="Fluxo Certo" className="h-10 w-auto" />
        <h1 className="mt-6 font-display text-[22px] text-slate-900">Painel de conteúdo</h1>
        <p className="mt-1 text-[14px] text-slate-500">Informe a senha para editar o site.</p>

        <label className="mt-6 block text-[13px] font-medium text-slate-600">Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          autoFocus
          className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 focus:border-brand focus:outline-none"
        />
        {erro ? <p className="mt-3 text-[13px] text-red-600">{erro}</p> : null}

        <button
          type="submit"
          disabled={enviando}
          className="mt-6 w-full rounded-lg bg-brand py-3 font-display text-[15px] font-semibold text-white transition hover:bg-brand-dark disabled:opacity-60"
        >
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>
        <Link to="/" className="mt-5 block text-center text-[13px] text-slate-500 hover:text-brand">
          ← Voltar ao site
        </Link>
      </form>
    </div>
  )
}

export default function AdminApp() {
  const [sessao, setSessao] = useState(null)
  const [rascunho, setRascunho] = useState(null)
  const [salvo, setSalvo] = useState(null)
  const [aba, setAba] = useState('conteudo')
  const [secao, setSecao] = useState('geral:brand')
  const [estado, setEstado] = useState({ salvando: false, mensagem: '', erro: '' })

  const carregar = useCallback(async () => {
    const [me, conteudo] = await Promise.all([
      api.sessao().catch(() => ({ autenticado: false })),
      api.buscarConteudo().catch(() => ({ conteudo: null })),
    ])
    setSessao(me)
    const mesclado = mergeContent(defaultContent, conteudo?.conteudo || null)
    setRascunho(mesclado)
    setSalvo(JSON.stringify(mesclado))
  }, [])

  useEffect(() => {
    carregar()
  }, [carregar])

  const alterado = useMemo(
    () => rascunho !== null && JSON.stringify(rascunho) !== salvo,
    [rascunho, salvo],
  )

  useEffect(() => {
    if (!alterado) return
    const aviso = (e) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', aviso)
    return () => window.removeEventListener('beforeunload', aviso)
  }, [alterado])

  async function salvar() {
    setEstado({ salvando: true, mensagem: '', erro: '' })
    try {
      await api.salvarConteudo(rascunho)
      setSalvo(JSON.stringify(rascunho))
      setEstado({ salvando: false, mensagem: 'Alterações publicadas.', erro: '' })
      setTimeout(() => setEstado((s) => ({ ...s, mensagem: '' })), 4000)
    } catch (err) {
      setEstado({ salvando: false, mensagem: '', erro: err.message })
    }
  }

  function descartar() {
    if (!confirm('Descartar todas as alterações não publicadas?')) return
    setRascunho(JSON.parse(salvo))
  }

  function restaurarPadrao() {
    if (!confirm('Restaurar o conteúdo original do site? As alterações atuais serão perdidas.')) return
    setRascunho(JSON.parse(JSON.stringify(defaultContent)))
  }

  if (sessao === null || rascunho === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-500">
        Carregando painel...
      </div>
    )
  }

  if (!sessao.autenticado) {
    return <Login aoEntrar={carregar} />
  }

  /* ------------------------------------------------------------ navegação */
  const itensMenu = []
  for (const grupo of GRUPOS) {
    if (grupo.chaves) {
      for (const chave of grupo.chaves) {
        itensMenu.push({ id: `geral:${chave}`, grupo: grupo.titulo, rotulo: rotuloDe(chave), caminho: [chave] })
      }
    } else {
      const { primitivos, grupos } = subsecoes(rascunho[grupo.raiz])
      if (primitivos.length) {
        itensMenu.push({
          id: `${grupo.id}:__seo`,
          grupo: grupo.titulo,
          rotulo: 'SEO da página',
          caminho: [grupo.raiz],
          apenas: primitivos,
        })
      }
      for (const chave of grupos) {
        itensMenu.push({
          id: `${grupo.id}:${chave}`,
          grupo: grupo.titulo,
          rotulo: rotuloDe(chave),
          caminho: [grupo.raiz, chave],
        })
      }
    }
  }

  const atual = itensMenu.find((i) => i.id === secao) || itensMenu[0]
  const valorAtual = atual.caminho.reduce((acc, k) => acc?.[k], rascunho)
  const valorVisivel = atual.apenas
    ? Object.fromEntries(atual.apenas.map((k) => [k, valorAtual[k]]))
    : valorAtual
  // seções (não os campos soltos de SEO nem os itens de "Geral") podem ser
  // ativadas/desativadas — controlado por um switch dedicado, fora da lista
  // genérica de campos.
  const podeAlternarAtiva = !atual.apenas && atual.grupo !== 'Geral' && 'ativo' in (valorAtual || {})

  function atualizarValorEm(caminho, novo) {
    setRascunho((anterior) => {
      const copia = structuredClone(anterior)
      let alvo = copia
      for (let i = 0; i < caminho.length - 1; i++) alvo = alvo[caminho[i]]
      alvo[caminho[caminho.length - 1]] = novo
      return copia
    })
  }

  function atualizarSecao(novo) {
    if (atual.apenas) {
      atualizarValorEm(atual.caminho, { ...valorAtual, ...novo })
    } else {
      atualizarValorEm(atual.caminho, novo)
    }
  }

  function alternarAtiva(item) {
    const valor = item.caminho.reduce((acc, k) => acc?.[k], rascunho)
    atualizarValorEm([...item.caminho, 'ativo'], !valor?.ativo)
  }

  const gruposMenu = [...new Set(itensMenu.map((i) => i.grupo))]

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {/* topo */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-4 px-5 py-3">
          <img src="/img/logo.png" alt="" className="h-8 w-auto" />
          <span className="font-display text-[15px] font-semibold text-slate-900">
            Painel de conteúdo
          </span>

          <nav className="ml-4 flex gap-1">
            {[
              ['conteudo', 'Conteúdo'],
              ['midias', 'Imagens'],
              ['leads', 'Cadastros'],
            ].map(([id, rotulo]) => (
              <button
                key={id}
                type="button"
                onClick={() => setAba(id)}
                className={`rounded-lg px-3.5 py-2 text-[14px] font-medium transition ${
                  aba === id ? 'bg-brand text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {rotulo}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex flex-wrap items-center gap-2">
            {estado.mensagem ? (
              <span className="text-[13px] text-emerald-600">{estado.mensagem}</span>
            ) : null}
            {estado.erro ? <span className="text-[13px] text-red-600">{estado.erro}</span> : null}
            {alterado ? (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-[12px] font-medium text-amber-700">
                alterações não publicadas
              </span>
            ) : null}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-slate-200 px-3 py-2 text-[14px] text-slate-600 transition hover:border-brand hover:text-brand"
            >
              Ver site
            </a>
            <button
              type="button"
              onClick={descartar}
              disabled={!alterado}
              className="rounded-lg border border-slate-200 px-3 py-2 text-[14px] text-slate-600 transition hover:border-slate-400 disabled:opacity-40"
            >
              Descartar
            </button>
            <button
              type="button"
              onClick={salvar}
              disabled={estado.salvando || !alterado}
              className="rounded-lg bg-brand px-4 py-2 text-[14px] font-semibold text-white transition hover:bg-brand-dark disabled:opacity-50"
            >
              {estado.salvando ? 'Publicando...' : 'Publicar'}
            </button>
            <button
              type="button"
              onClick={async () => {
                await api.sair().catch(() => {})
                carregar()
              }}
              className="rounded-lg px-3 py-2 text-[14px] text-slate-500 hover:text-slate-800"
            >
              Sair
            </button>
          </div>
        </div>

        {!sessao.armazenamento?.d1 || !sessao.armazenamento?.r2 ? (
          <div className="bg-amber-50 px-5 py-2 text-center text-[13px] text-amber-800">
            {!sessao.armazenamento?.d1 ? 'Banco D1 não configurado — não é possível publicar. ' : ''}
            {!sessao.armazenamento?.r2 ? 'Bucket R2 não configurado — upload de imagens indisponível.' : ''}
          </div>
        ) : null}
      </header>

      {aba === 'conteudo' ? (
        <div className="mx-auto flex max-w-[1400px] gap-6 px-5 py-6">
          {/* menu lateral */}
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 space-y-6">
              {gruposMenu.map((grupo) => (
                <div key={grupo}>
                  <p className="px-3 text-[12px] font-semibold uppercase tracking-wider text-slate-400">
                    {grupo}
                  </p>
                  <ul className="mt-2 space-y-0.5">
                    {itensMenu
                      .filter((i) => i.grupo === grupo)
                      .map((item) => {
                        const valorItem = item.caminho.reduce((acc, k) => acc?.[k], rascunho)
                        const temToggle = !item.apenas && 'ativo' in (valorItem || {})
                        const inativa = temToggle && valorItem.ativo === false
                        return (
                          <li key={item.id} className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSecao(item.id)}
                              className={`min-w-0 flex-1 rounded-lg px-3 py-2 text-left text-[14px] transition ${
                                atual.id === item.id
                                  ? 'bg-white font-medium text-brand shadow-sm'
                                  : 'text-slate-600 hover:bg-white/70'
                              } ${inativa ? 'opacity-50' : ''}`}
                            >
                              <span className="truncate">{item.rotulo}</span>
                              {inativa ? (
                                <span className="ml-1.5 text-[11px] text-slate-400">(inativa)</span>
                              ) : null}
                            </button>
                            {temToggle ? (
                              <Switch
                                ligado={valorItem.ativo !== false}
                                onChange={() => alternarAtiva(item)}
                                titulo={
                                  valorItem.ativo !== false
                                    ? 'Desativar esta seção no site'
                                    : 'Ativar esta seção no site'
                                }
                              />
                            ) : null}
                          </li>
                        )
                      })}
                  </ul>
                </div>
              ))}

              <button
                type="button"
                onClick={restaurarPadrao}
                className="w-full rounded-lg px-3 py-2 text-left text-[13px] text-slate-400 hover:text-red-600"
              >
                Restaurar conteúdo original
              </button>
            </div>
          </aside>

          {/* editor */}
          <main className="min-w-0 flex-1">
            <div className="mb-4 lg:hidden">
              <select
                value={atual.id}
                onChange={(e) => setSecao(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-[14px]"
              >
                {gruposMenu.map((grupo) => (
                  <optgroup key={grupo} label={grupo}>
                    {itensMenu
                      .filter((i) => i.grupo === grupo)
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.rotulo}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-[20px] text-slate-900">{atual.rotulo}</h2>
                  <p className="mt-1 text-[13px] text-slate-500">
                    {atual.grupo} · todos os campos abaixo aparecem no site publicado.
                  </p>
                </div>
                {podeAlternarAtiva ? (
                  <label className="flex shrink-0 items-center gap-2.5 rounded-lg bg-slate-50 px-3 py-2">
                    <Switch
                      ligado={valorAtual.ativo !== false}
                      onChange={() => alternarAtiva(atual)}
                    />
                    <span className="text-[13px] font-medium text-slate-700">
                      {valorAtual.ativo !== false ? 'Seção ativa' : 'Seção desativada'}
                    </span>
                  </label>
                ) : null}
              </div>

              {podeAlternarAtiva && valorAtual.ativo === false ? (
                <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-[13px] text-amber-800">
                  Esta seção está desativada e não aparece no site, mesmo publicada.
                </p>
              ) : null}

              <div className="mt-7">
                <Editor
                  valor={valorVisivel}
                  onChange={atualizarSecao}
                  ocultar={podeAlternarAtiva ? ['ativo'] : []}
                />
              </div>
            </div>
          </main>
        </div>
      ) : null}

      {aba === 'midias' ? <Midias /> : null}
      {aba === 'leads' ? <Leads /> : null}
    </div>
  )
}
