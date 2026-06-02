// Ponto de entrada — orquestra todos os modulos
import './style.css'
import { store } from './src/store/index.js'
import { storage } from './src/services/storage.js'
import { api } from './src/services/api.js'
import { addLink, removeLink } from './src/data/links.js'
import { filtrarLinks } from './src/data/filters.js'
import { renderizarLinks, renderizarTags, atualizarContagem } from './src/ui/render.js'
import { debounce } from './src/utils/debounce.js'

// ─── Elementos do DOM ─────────────────────────────────────────
const listaEl = document.querySelector('#lista-links')
const listaTagsEl = document.querySelector('#lista-tags')
const contagemEl = document.querySelector('#contagem-links')
const spinner = document.querySelector('#spinner')
const erroBanner = document.querySelector('#erro-banner')
const buscaInput = document.querySelector('#busca')
const btnAdicionar = document.querySelector('#btn-adicionar')
const btnCancelarModal = document.querySelector('#btn-cancelar')
const formAdicionar = document.querySelector('#form-adicionar')
const modal = document.querySelector('#modal-adicionar')
const btnLimparFiltro = document.querySelector('#limpar-filtro')

// ─── Subscribers — reagem ao estado ──────────────────────────
store.subscribe(estado => {
  const linksFiltrados = filtrarLinks(estado.links, {
    tag: estado.filtroTag,
    termo: estado.termoBusca
  })

  renderizarLinks(linksFiltrados, listaEl)
  renderizarTags(estado.links, listaTagsEl, estado.filtroTag)
  atualizarContagem(estado.links.length, linksFiltrados.length, contagemEl)

  if (spinner) spinner.hidden = !estado.carregando

  if (erroBanner) {
    erroBanner.textContent = estado.erro ?? ''
    erroBanner.hidden = !estado.erro
  }

  if (btnLimparFiltro) {
    btnLimparFiltro.hidden = !estado.filtroTag && !estado.termoBusca
  }

  // Persistir automaticamente
  storage.salvarLinks(estado.links)
})

// ─── Eventos de busca ─────────────────────────────────────────
buscaInput?.addEventListener('input', debounce(e => {
  store.setState({ termoBusca: e.target.value })
}, 300))

// ─── Eventos de filtro por tag ────────────────────────────────
listaTagsEl?.addEventListener('click', e => {
  const li = e.target.closest('[data-tag]')
  if (!li) return
  const tag = li.dataset.tag
  const { filtroTag } = store.getState()
  store.setState({ filtroTag: filtroTag === tag ? null : tag })
})

listaEl?.addEventListener('click', e => {
  const tag = e.target.closest('.tag[data-tag]')?.dataset.tag
  if (tag) {
    const { filtroTag } = store.getState()
    store.setState({ filtroTag: filtroTag === tag ? null : tag })
    return
  }

  const btnRemover = e.target.closest('.btn-remover[data-id]')
  if (btnRemover) {
    const id = Number(btnRemover.dataset.id)
    const { links } = store.getState()
    store.setState({ links: removeLink(links, id) })
  }
})

btnLimparFiltro?.addEventListener('click', () => {
  store.setState({ filtroTag: null, termoBusca: '' })
  if (buscaInput) buscaInput.value = ''
})

// ─── Modal de adicionar link ──────────────────────────────────
btnAdicionar?.addEventListener('click', () => modal?.showModal())
btnCancelarModal?.addEventListener('click', () => modal?.close())

formAdicionar?.addEventListener('submit', e => {
  e.preventDefault()
  const dados = Object.fromEntries(new FormData(formAdicionar))
  const tags = dados.tags
    ? dados.tags.split(',').map(t => t.trim()).filter(Boolean)
    : []

  const { links } = store.getState()
  store.setState({ links: addLink(links, { url: dados.url, title: dados.title, tags }) })

  formAdicionar.reset()
  modal?.close()
})

// ─── Inicializacao ────────────────────────────────────────────
async function inicializar() {
  // 1. Carregar dados locais imediatamente
  const linksLocais = storage.carregarLinks()
  if (linksLocais.length > 0) {
    store.setState({ links: linksLocais })
  }

  // 2. Dados iniciais se localStorage vazio
  if (linksLocais.length === 0) {
    store.setState({
      links: [
        {
          id: 1,
          url: 'https://developer.mozilla.org',
          title: 'MDN Web Docs',
          tags: ['referencia', 'javascript', 'web'],
          favorito: false,
          createdAt: new Date('2026-01-15').toISOString()
        },
        {
          id: 2,
          url: 'https://vite.dev',
          title: 'Vite',
          tags: ['ferramentas', 'build'],
          favorito: false,
          createdAt: new Date('2026-01-20').toISOString()
        },
        {
          id: 3,
          url: 'https://vitest.dev',
          title: 'Vitest',
          tags: ['testes', 'ferramentas'],
          favorito: false,
          createdAt: new Date('2026-01-22').toISOString()
        },
        {
          id: 4,
          url: 'https://go.dev',
          title: 'Go',
          tags: ['backend', 'linguagem'],
          favorito: false,
          createdAt: new Date('2026-01-25').toISOString()
        }
      ]
    })
  }
}

inicializar()
