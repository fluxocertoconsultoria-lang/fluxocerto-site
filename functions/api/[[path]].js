/**
 * API do site — Cloudflare Pages Functions.
 *
 * Bindings esperados (wrangler.toml / painel da Cloudflare):
 *   DB    -> D1  (conteúdo, leads)
 *   MEDIA -> R2  (imagens enviadas pelo painel)
 * Variáveis:
 *   ADMIN_PASSWORD       senha do painel (ou ADMIN_PASSWORD_HASH em sha256 hex)
 *   SESSION_SECRET       segredo para assinar o cookie de sessão
 *
 * Sem D1 configurado a API responde 503 nas rotas de escrita e o site público
 * cai no conteúdo padrão embutido no bundle — ou seja, nunca fica fora do ar.
 */

const SESSION_COOKIE = 'fc_session'
const SESSION_TTL = 60 * 60 * 12 // 12h
const CONTENT_KEY = 'site'
const MAX_UPLOAD = 8 * 1024 * 1024 // 8 MB

const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...headers },
  })

const enc = new TextEncoder()

/* ------------------------------------------------------------------ auth */

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest('SHA-256', enc.encode(text))
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function b64url(bytes) {
  let s = ''
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes)
  for (const b of arr) s += String.fromCharCode(b)
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function b64urlDecode(str) {
  const pad = str.replace(/-/g, '+').replace(/_/g, '/')
  const bin = atob(pad + '==='.slice((pad.length + 3) % 4))
  return Uint8Array.from(bin, (c) => c.charCodeAt(0))
}

async function hmacKey(secret) {
  return crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
    'verify',
  ])
}

async function signSession(secret, payload) {
  const body = b64url(enc.encode(JSON.stringify(payload)))
  const key = await hmacKey(secret)
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(body))
  return `${body}.${b64url(sig)}`
}

async function verifySession(secret, token) {
  if (!token || !token.includes('.')) return null
  const [body, sig] = token.split('.')
  try {
    const key = await hmacKey(secret)
    const ok = await crypto.subtle.verify('HMAC', key, b64urlDecode(sig), enc.encode(body))
    if (!ok) return null
    const payload = JSON.parse(new TextDecoder().decode(b64urlDecode(body)))
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}

function readCookie(request, name) {
  const raw = request.headers.get('cookie') || ''
  for (const part of raw.split(';')) {
    const [k, ...v] = part.trim().split('=')
    if (k === name) return decodeURIComponent(v.join('='))
  }
  return null
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

async function requireAuth(request, env) {
  const secret = env.SESSION_SECRET
  if (!secret) return null
  return verifySession(secret, readCookie(request, SESSION_COOKIE))
}

/* -------------------------------------------------------------------- db */

async function ensureSchema(env) {
  if (!env.DB) return false
  await env.DB.batch([
    env.DB.prepare(
      `CREATE TABLE IF NOT EXISTS content (
         key TEXT PRIMARY KEY,
         value TEXT NOT NULL,
         updated_at TEXT NOT NULL
       )`,
    ),
    env.DB.prepare(
      `CREATE TABLE IF NOT EXISTS leads (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         nome TEXT, email TEXT, whatsapp TEXT, instagram TEXT,
         origem TEXT, created_at TEXT NOT NULL
       )`,
    ),
    env.DB.prepare(
      `CREATE TABLE IF NOT EXISTS media (
         key TEXT PRIMARY KEY,
         nome TEXT, tipo TEXT, tamanho INTEGER, created_at TEXT NOT NULL
       )`,
    ),
  ])
  return true
}

/* ----------------------------------------------------------------- rotas */

export async function onRequest(context) {
  const { request, env, params } = context
  const segments = Array.isArray(params.path) ? params.path : params.path ? [params.path] : []
  const route = segments.join('/')
  const method = request.method.toUpperCase()

  try {
    /* ---------------------------------------------------------- sessão */
    if (route === 'login' && method === 'POST') {
      const { senha } = await request.json().catch(() => ({}))
      if (!senha) return json({ erro: 'Informe a senha.' }, 400)
      if (!env.SESSION_SECRET) return json({ erro: 'SESSION_SECRET não configurado.' }, 503)

      let ok = false
      if (env.ADMIN_PASSWORD_HASH) {
        ok = timingSafeEqual(await sha256Hex(senha), env.ADMIN_PASSWORD_HASH.toLowerCase())
      } else if (env.ADMIN_PASSWORD) {
        ok = timingSafeEqual(await sha256Hex(senha), await sha256Hex(env.ADMIN_PASSWORD))
      } else {
        return json({ erro: 'ADMIN_PASSWORD não configurado.' }, 503)
      }
      if (!ok) return json({ erro: 'Senha incorreta.' }, 401)

      const token = await signSession(env.SESSION_SECRET, {
        sub: 'admin',
        exp: Math.floor(Date.now() / 1000) + SESSION_TTL,
      })
      const secure = new URL(request.url).protocol === 'https:' ? ' Secure;' : ''
      return json(
        { ok: true },
        200,
        {
          'set-cookie': `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax;${secure} Max-Age=${SESSION_TTL}`,
        },
      )
    }

    if (route === 'logout' && method === 'POST') {
      return json({ ok: true }, 200, {
        'set-cookie': `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
      })
    }

    if (route === 'me' && method === 'GET') {
      const session = await requireAuth(request, env)
      return json({
        autenticado: !!session,
        configurado: !!(env.DB && env.SESSION_SECRET && (env.ADMIN_PASSWORD || env.ADMIN_PASSWORD_HASH)),
        armazenamento: { d1: !!env.DB, r2: !!env.MEDIA },
      })
    }

    /* -------------------------------------------------------- conteúdo */
    if (route === 'content' && method === 'GET') {
      if (!env.DB) return json({ conteudo: null, atualizadoEm: null })
      await ensureSchema(env)
      const row = await env.DB.prepare('SELECT value, updated_at FROM content WHERE key = ?')
        .bind(CONTENT_KEY)
        .first()
      if (!row) return json({ conteudo: null, atualizadoEm: null })
      return json(
        { conteudo: JSON.parse(row.value), atualizadoEm: row.updated_at },
        200,
        { 'cache-control': 'public, max-age=0, must-revalidate' },
      )
    }

    if (route === 'content' && (method === 'PUT' || method === 'POST')) {
      const session = await requireAuth(request, env)
      if (!session) return json({ erro: 'Não autenticado.' }, 401)
      if (!env.DB) return json({ erro: 'Banco D1 não configurado.' }, 503)
      await ensureSchema(env)
      const body = await request.json().catch(() => null)
      if (!body || typeof body !== 'object' || !body.conteudo) {
        return json({ erro: 'Corpo inválido.' }, 400)
      }
      const value = JSON.stringify(body.conteudo)
      if (value.length > 1_500_000) return json({ erro: 'Conteúdo muito grande.' }, 413)
      const now = new Date().toISOString()
      await env.DB.prepare(
        `INSERT INTO content (key, value, updated_at) VALUES (?, ?, ?)
         ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
      )
        .bind(CONTENT_KEY, value, now)
        .run()
      return json({ ok: true, atualizadoEm: now })
    }

    /* ------------------------------------------------------------ mídia */
    if (route === 'upload' && method === 'POST') {
      const session = await requireAuth(request, env)
      if (!session) return json({ erro: 'Não autenticado.' }, 401)
      if (!env.MEDIA) return json({ erro: 'Bucket R2 não configurado.' }, 503)

      const form = await request.formData()
      const file = form.get('arquivo')
      if (!file || typeof file === 'string') return json({ erro: 'Arquivo ausente.' }, 400)
      if (file.size > MAX_UPLOAD) return json({ erro: 'Arquivo acima de 8 MB.' }, 413)
      if (!/^image\//.test(file.type)) return json({ erro: 'Envie apenas imagens.' }, 415)

      const nomeLimpo = (file.name || 'imagem')
        .toLowerCase()
        .replace(/[^a-z0-9.\-_]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(-80)
      const key = `${Date.now().toString(36)}-${crypto.randomUUID().slice(0, 8)}-${nomeLimpo}`

      await env.MEDIA.put(key, file.stream(), {
        httpMetadata: { contentType: file.type, cacheControl: 'public, max-age=31536000, immutable' },
      })
      if (env.DB) {
        await ensureSchema(env)
        await env.DB.prepare(
          'INSERT INTO media (key, nome, tipo, tamanho, created_at) VALUES (?, ?, ?, ?, ?)',
        )
          .bind(key, file.name || nomeLimpo, file.type, file.size, new Date().toISOString())
          .run()
      }
      return json({ ok: true, url: `/api/media/${key}`, key })
    }

    if (route === 'media' && method === 'GET') {
      const session = await requireAuth(request, env)
      if (!session) return json({ erro: 'Não autenticado.' }, 401)
      if (!env.DB) return json({ itens: [] })
      await ensureSchema(env)
      const { results } = await env.DB.prepare(
        'SELECT key, nome, tipo, tamanho, created_at FROM media ORDER BY created_at DESC LIMIT 300',
      ).all()
      return json({
        itens: (results || []).map((m) => ({ ...m, url: `/api/media/${m.key}` })),
      })
    }

    if (segments[0] === 'media' && segments.length > 1) {
      const key = segments.slice(1).map(decodeURIComponent).join('/')

      if (method === 'DELETE') {
        const session = await requireAuth(request, env)
        if (!session) return json({ erro: 'Não autenticado.' }, 401)
        if (env.MEDIA) await env.MEDIA.delete(key)
        if (env.DB) await env.DB.prepare('DELETE FROM media WHERE key = ?').bind(key).run()
        return json({ ok: true })
      }

      if (method === 'GET' || method === 'HEAD') {
        if (!env.MEDIA) return new Response('R2 não configurado', { status: 503 })
        const object = await env.MEDIA.get(key)
        if (!object) return new Response('Não encontrado', { status: 404 })
        const headers = new Headers()
        object.writeHttpMetadata(headers)
        headers.set('etag', object.httpEtag)
        headers.set('cache-control', 'public, max-age=31536000, immutable')
        return new Response(method === 'HEAD' ? null : object.body, { headers })
      }
    }

    /* ------------------------------------------------------------ leads */
    if (route === 'leads' && method === 'POST') {
      if (!env.DB) return json({ erro: 'Banco D1 não configurado.' }, 503)
      await ensureSchema(env)
      const body = await request.json().catch(() => ({}))
      const nome = String(body.nome || '').trim().slice(0, 160)
      const email = String(body.email || '').trim().slice(0, 160)
      if (!nome || !email) return json({ erro: 'Nome e e-mail são obrigatórios.' }, 400)
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ erro: 'E-mail inválido.' }, 400)
      await env.DB.prepare(
        'INSERT INTO leads (nome, email, whatsapp, instagram, origem, created_at) VALUES (?, ?, ?, ?, ?, ?)',
      )
        .bind(
          nome,
          email,
          String(body.whatsapp || '').slice(0, 60),
          String(body.instagram || '').slice(0, 80),
          String(body.origem || 'mentoria').slice(0, 40),
          new Date().toISOString(),
        )
        .run()
      return json({ ok: true })
    }

    if (route === 'leads' && method === 'GET') {
      const session = await requireAuth(request, env)
      if (!session) return json({ erro: 'Não autenticado.' }, 401)
      if (!env.DB) return json({ itens: [] })
      await ensureSchema(env)
      const { results } = await env.DB.prepare(
        'SELECT * FROM leads ORDER BY created_at DESC LIMIT 500',
      ).all()
      return json({ itens: results || [] })
    }

    return json({ erro: 'Rota não encontrada.' }, 404)
  } catch (err) {
    return json({ erro: 'Erro interno.', detalhe: String(err && err.message) }, 500)
  }
}
