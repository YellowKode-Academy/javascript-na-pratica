// Capítulo 3 — Funções modernas, destructuring, filtros
// DevFeed: filtro por tag e busca por termo

const links = [
  {
    id: 1,
    url: 'https://developer.mozilla.org',
    title: 'MDN Web Docs',
    tags: ['referencia', 'javascript', 'web'],
    createdAt: new Date('2026-01-15').toISOString()
  },
  {
    id: 2,
    url: 'https://vite.dev',
    title: 'Vite',
    tags: ['ferramentas', 'build'],
    createdAt: new Date('2026-01-20').toISOString()
  },
  {
    id: 3,
    url: 'https://vitest.dev',
    title: 'Vitest',
    tags: ['testes', 'ferramentas'],
    createdAt: new Date('2026-01-22').toISOString()
  },
  {
    id: 4,
    url: 'https://go.dev',
    title: 'Go',
    tags: ['backend', 'linguagem'],
    createdAt: new Date('2026-01-25').toISOString()
  }
]

// ─── CRUD imutável (cap-02) ──────────────────────────────────────────────────
function addLink(lista, dados) {
  return [...lista, { id: Date.now(), favorito: false, createdAt: new Date().toISOString(), tags: [], ...dados }]
}
function removeLink(lista, id) { return lista.filter(l => l.id !== id) }
function updateLink(lista, id, mudancas) { return lista.map(l => l.id === id ? { ...l, ...mudancas } : l) }

// ─── Filtros (cap-03) ─────────────────────────────────────────────────────────
function filtrarLinks(lista, { tag, termo } = {}) {
  return lista.filter(link => {
    if (tag && !link.tags.includes(tag)) return false
    if (termo) {
      const t = termo.toLowerCase()
      return link.title.toLowerCase().includes(t) || link.url.toLowerCase().includes(t)
    }
    return true
  })
}

function extrairTodasTags(lista) {
  return [...new Set(lista.flatMap(l => l.tags))].sort()
}

// ─── Renderizacao ─────────────────────────────────────────────────────────────
function renderizarLinks(lista) {
  const el = document.getElementById('lista-links')
  el.innerHTML = lista.map(link => `
    <li>
      <a href="${link.url}" target="_blank">${link.title}</a>
      <div class="tags">${link.tags.map(t => `<span class="tag" onclick="filtrar('${t}')">${t}</span>`).join('')}</div>
    </li>
  `).join('')
}

let tagAtiva = null

function filtrar(tag) {
  tagAtiva = tagAtiva === tag ? null : tag
  renderizarLinks(filtrarLinks(links, { tag: tagAtiva }))
}

renderizarLinks(links)
