// Capítulo 7 — Fetch API: CRUD Completo

const API_URL = 'https://jsonplaceholder.typicode.com'

// ─── GET — buscar lista ───────────────────────────────────────
async function listarLinks() {
  const res = await fetch(API_URL + '/todos?_limit=5')
  if (!res.ok) throw new Error('HTTP ' + res.status)
  return res.json()
}

// ─── GET — buscar por id ──────────────────────────────────────
async function buscarLink(id) {
  const res = await fetch(API_URL + '/todos/' + id)
  if (!res.ok) throw new Error('HTTP ' + res.status)
  return res.json()
}

// ─── POST — criar ─────────────────────────────────────────────
async function criarLink(dados) {
  const res = await fetch(API_URL + '/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })
  if (!res.ok) throw new Error('HTTP ' + res.status)
  return res.json()
}

// ─── PATCH — atualizar campos ─────────────────────────────────
async function patchLink(id, campos) {
  const res = await fetch(API_URL + '/todos/' + id, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(campos)
  })
  if (!res.ok) throw new Error('HTTP ' + res.status)
  return res.json()
}

// ─── DELETE ───────────────────────────────────────────────────
async function removerLink(id) {
  const res = await fetch(API_URL + '/todos/' + id, { method: 'DELETE' })
  if (!res.ok) throw new Error('HTTP ' + res.status)
  return true
}

// ─── Cliente HTTP reutilizável ────────────────────────────────
function criarCliente(baseUrl, opcoesPadrao = {}) {
  async function request(caminho, opcoes = {}) {
    const res = await fetch(baseUrl + caminho, {
      ...opcoesPadrao,
      ...opcoes,
      headers: {
        'Content-Type': 'application/json',
        ...opcoesPadrao.headers,
        ...opcoes.headers
      }
    })
    if (!res.ok) throw new Error('HTTP ' + res.status + ' em ' + caminho)
    return res.status === 204 ? null : res.json()
  }

  return {
    get: caminho => request(caminho),
    post: (caminho, dados) => request(caminho, { method: 'POST', body: JSON.stringify(dados) }),
    patch: (caminho, dados) => request(caminho, { method: 'PATCH', body: JSON.stringify(dados) }),
    put: (caminho, dados) => request(caminho, { method: 'PUT', body: JSON.stringify(dados) }),
    delete: caminho => request(caminho, { method: 'DELETE' })
  }
}

// Demo
async function demo() {
  const api = criarCliente(API_URL)
  const links = await api.get('/todos?_limit=3')
  console.log('Links:', links.length)
  const novo = await api.post('/todos', { title: 'DevFeed', completed: false, userId: 1 })
  console.log('Criado:', novo)
}

demo()
