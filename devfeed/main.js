// main.js — ponto de entrada com módulos ES (cap-04)
import './style.css'
import { addLink, removeLink } from './src/data/links.js'
import { filtrarLinks, extrairTodasTags } from './src/data/filters.js'
import { renderizarLinks } from './src/ui/render.js'

const LINKS_INICIAIS = [
  { id: 1, url: 'https://developer.mozilla.org', title: 'MDN Web Docs', tags: ['referencia', 'javascript'], createdAt: new Date('2026-01-15').toISOString(), favorito: false },
  { id: 2, url: 'https://vite.dev', title: 'Vite', tags: ['ferramentas', 'build'], createdAt: new Date('2026-01-20').toISOString(), favorito: false },
  { id: 3, url: 'https://vitest.dev', title: 'Vitest', tags: ['testes', 'ferramentas'], createdAt: new Date('2026-01-22').toISOString(), favorito: false },
]

let links = LINKS_INICIAIS
const lista = document.querySelector('#lista-links')

// Renderizacao inicial
renderizarLinks(links, lista)

// Evento de remocao
lista?.addEventListener('click', e => {
  const btn = e.target.closest('.btn-remover[data-id]')
  if (btn) {
    links = removeLink(links, Number(btn.dataset.id))
    renderizarLinks(links, lista)
  }
})
