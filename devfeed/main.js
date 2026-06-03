// main.js — Fetch API com CRUD completo (cap-07)
import './style.css'
import { api } from './src/services/api.js'
import { renderizarLinks } from './src/ui/render.js'

const spinner = document.querySelector('#spinner')
const lista = document.querySelector('#lista-links')
const erroBanner = document.querySelector('#erro-banner')

async function inicializar() {
  try {
    if (spinner) spinner.hidden = false
    const dados = await api.listar()
    // Adapta formato do jsonplaceholder para o DevFeed
    const links = dados.map(item => ({
      id: item.id,
      url: `https://example.com/${item.id}`,
      title: item.title,
      tags: ['demo'],
      favorito: item.completed
    }))
    renderizarLinks(links, lista)
  } catch (err) {
    if (erroBanner) { erroBanner.textContent = err.message; erroBanner.hidden = false }
  } finally {
    if (spinner) spinner.hidden = true
  }
}

inicializar()
