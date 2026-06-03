// main.js — Error handling com classes customizadas (cap-08)
import './style.css'
import { api, ApiError, NetworkError } from './src/services/api.js'
import { renderizarLinks } from './src/ui/render.js'

const spinner = document.querySelector('#spinner')
const lista = document.querySelector('#lista-links')
const erroBanner = document.querySelector('#erro-banner')

async function inicializar() {
  try {
    if (spinner) spinner.hidden = false
    const dados = await api.listar()
    const links = dados.map(item => ({
      id: item.id, url: `https://example.com/${item.id}`,
      title: item.title, tags: ['demo'], favorito: item.completed
    }))
    renderizarLinks(links, lista)
  } catch (err) {
    let mensagem = 'Erro desconhecido'
    if (err instanceof NetworkError) mensagem = 'Sem conexao. Verifique sua internet.'
    else if (err instanceof ApiError && err.status === 404) mensagem = 'Recurso nao encontrado.'
    else if (err instanceof ApiError) mensagem = `Erro do servidor: HTTP ${err.status}`
    if (erroBanner) { erroBanner.textContent = mensagem; erroBanner.hidden = false }
  } finally {
    if (spinner) spinner.hidden = true
  }
}

inicializar()
