// main.js — busca com debounce (cap-12)
import './style.css'
import { store } from './src/store/index.js'
import { storage } from './src/services/storage.js'
import { removeLink } from './src/data/links.js'
import { filtrarLinks } from './src/data/filters.js'
import { renderizarLinks, renderizarTags, atualizarContagem } from './src/ui/render.js'
import { debounce } from './src/utils/debounce.js'

const lista = document.querySelector('#lista-links')
const listaTagsEl = document.querySelector('#lista-tags')
const contagemEl = document.querySelector('#contagem-links')
const buscaInput = document.querySelector('#busca')
const btnLimparFiltro = document.querySelector('#limpar-filtro')

// Busca com debounce: só executa 300ms após o usuario parar de digitar
buscaInput?.addEventListener('input', debounce(e => {
  store.setState({ termoBusca: e.target.value })
}, 300))

lista?.addEventListener('click', e => {
  const tagEl = e.target.closest('.tag[data-tag]')
  if (tagEl) {
    const { filtroTag } = store.getState()
    store.setState({ filtroTag: filtroTag === tagEl.dataset.tag ? null : tagEl.dataset.tag })
    return
  }
  const btn = e.target.closest('.btn-remover[data-id]')
  if (btn) {
    const { links } = store.getState()
    store.setState({ links: removeLink(links, Number(btn.dataset.id)) })
  }
})
listaTagsEl?.addEventListener('click', e => {
  const li = e.target.closest('[data-tag]')
  if (!li) return
  const { filtroTag } = store.getState()
  store.setState({ filtroTag: filtroTag === li.dataset.tag ? null : li.dataset.tag })
})
btnLimparFiltro?.addEventListener('click', () => {
  store.setState({ filtroTag: null, termoBusca: '' })
  if (buscaInput) buscaInput.value = ''
})

store.subscribe(estado => {
  const filtrados = filtrarLinks(estado.links, { tag: estado.filtroTag, termo: estado.termoBusca })
  renderizarLinks(filtrados, lista)
  renderizarTags(estado.links, listaTagsEl, estado.filtroTag)
  atualizarContagem(estado.links.length, filtrados.length, contagemEl)
  if (btnLimparFiltro) btnLimparFiltro.hidden = !estado.filtroTag && !estado.termoBusca
  storage.salvarLinks(estado.links)
})

const linksSalvos = storage.carregarLinks()
store.setState({
  links: linksSalvos.length > 0 ? linksSalvos : [
    { id: 1, url: 'https://developer.mozilla.org', title: 'MDN Web Docs', tags: ['javascript', 'referencia'], favorito: false, createdAt: '2026-01-15' },
    { id: 2, url: 'https://vite.dev', title: 'Vite', tags: ['ferramentas'], favorito: false, createdAt: '2026-01-20' },
    { id: 3, url: 'https://vitest.dev', title: 'Vitest', tags: ['testes'], favorito: false, createdAt: '2026-01-22' },
  ]
})
