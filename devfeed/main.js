// Capítulo 2 — Tipos, referências e imutabilidade
// DevFeed: funções puras para CRUD sem mutar o array original

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

// ─── Funções puras: nunca mutam o array original ──────────────────────────────
function addLink(lista, dados) {
  return [...lista, { id: Date.now(), favorito: false, createdAt: new Date().toISOString(), tags: [], ...dados }]
}

function removeLink(lista, id) {
  return lista.filter(link => link.id !== id)
}

function updateLink(lista, id, mudancas) {
  return lista.map(link => link.id === id ? { ...link, ...mudancas } : link)
}

// ─── Renderizacao ─────────────────────────────────────────────────────────────
function renderizarLinks(lista) {
  const el = document.getElementById('lista-links')
  el.innerHTML = lista.map(link => `
    <li>
      <a href="${link.url}" target="_blank">${link.title}</a>
      <div class="tags">${link.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <button onclick="remover(${link.id})">Remover</button>
    </li>
  `).join('')
}

let estado = links

function remover(id) {
  estado = removeLink(estado, id)  // novo array, original intacto
  renderizarLinks(estado)
}

renderizarLinks(estado)
