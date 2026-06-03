// Capítulo 1 — O JavaScript que você não sabia que estava usando
// DevFeed: estrutura inicial com ES2022+ (optional chaining, nullish coalescing)

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

// ─── Optional chaining e nullish coalescing na pratica ────────────────────────
function renderizarLinks(lista) {
  const containerEl = document.getElementById('lista-links')

  containerEl.innerHTML = lista.map(link => {
    const contagem = link?.tags?.length ?? 0
    const tagsHtml = link?.tags?.map(tag => `<span class="tag">${tag}</span>`).join('') ?? ''

    return `
      <li>
        <a href="${link.url}" target="_blank" rel="noopener">${link.title}</a>
        <small>${contagem} tag(s)</small>
        <div class="tags">${tagsHtml}</div>
      </li>
    `
  }).join('')
}

// ─── structuredClone: cópia profunda nativa ───────────────────────────────────
const copia = structuredClone(links[0])
copia.tags.push('copia')
console.log('Original intacto:', links[0].tags) // sem 'copia'

// ─── Array.at(): acesso por índice negativo ───────────────────────────────────
console.log('Ultimo link:', links.at(-1).title)

renderizarLinks(links)
