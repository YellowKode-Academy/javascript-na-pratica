// main.js — UI reativa via mini store (cap-09)
import './style.css'
import { store } from './src/store/index.js'
import { api } from './src/services/api.js'
import { addLink, removeLink } from './src/data/links.js'
import { filtrarLinks } from './src/data/filters.js'
import { renderizarLinks, renderizarTags, atualizarContagem } from './src/ui/render.js'

const lista = document.querySelector('#lista-links')
const listaTagsEl = document.querySelector('#lista-tags')
const contagemEl = document.querySelector('#contagem-links')
const spinner = document.querySelector('#spinner')
const erroBanner = document.querySelector('#erro-banner')
const btnLimparFiltro = document.querySelector('#limpar-filtro')

// Subscriber — re-renderiza quando o estado muda
store.subscribe(estado => {
  const filtrados = filtrarLinks(estado.links, {
    tag: estado.filtroTag,
    termo: estado.termoBusca
  })
  renderizarLinks(filtrados, lista)
  renderizarTags(estado.links, listaTagsEl, estado.filtroTag)
  atualizarContagem(estado.links.length, filtrados.length, contagemEl)
  if (spinner) spinner.hidden = !estado.carregando
  if (erroBanner) { erroBanner.textContent = estado.erro ?? ''; erroBanner.hidden = !estado.erro }
  if (btnLimparFiltro) btnLimparFiltro.hidden = !estado.filtroTag && !estado.termoBusca
})

// Filtro por tag
listaTagsEl?.addEventListener('click', e => {
  const li = e.target.closest('[data-tag]')
  if (!li) return
  const tag = li.dataset.tag
  const { filtroTag } = store.getState()
  store.setState({ filtroTag: filtroTag === tag ? null : tag })
})

// Remover link
lista?.addEventListener('click', e => {
  const btn = e.target.closest('.btn-remover[data-id]')
  if (!btn) return
  const { links } = store.getState()
  store.setState({ links: removeLink(links, Number(btn.dataset.id)) })
})

btnLimparFiltro?.addEventListener('click', () => store.setState({ filtroTag: null, termoBusca: '' }))

// Inicializar com dados de exemplo
store.setState({
  links: [
    { id: 1, url: 'https://developer.mozilla.org', title: 'MDN Web Docs', tags: ['javascript', 'referencia'], favorito: false, createdAt: '2026-01-15' },
    { id: 2, url: 'https://vite.dev', title: 'Vite', tags: ['ferramentas'], favorito: false, createdAt: '2026-01-20' },
    { id: 3, url: 'https://vitest.dev', title: 'Vitest', tags: ['testes', 'ferramentas'], favorito: false, createdAt: '2026-01-22' },
  ]
})
