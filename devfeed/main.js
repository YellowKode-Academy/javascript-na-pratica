// main.js — async/await (cap-06)
import './style.css'
import { renderizarLinks } from './src/ui/render.js'

const spinner = document.querySelector('#spinner')
const lista = document.querySelector('#lista-links')
const erroBanner = document.querySelector('#erro-banner')

async function carregarLinks() {
  return new Promise(resolve => setTimeout(() => resolve([
    { id: 1, url: 'https://developer.mozilla.org', title: 'MDN Web Docs', tags: ['javascript'], favorito: false },
    { id: 2, url: 'https://vite.dev', title: 'Vite', tags: ['ferramentas'], favorito: false },
    { id: 3, url: 'https://vitest.dev', title: 'Vitest', tags: ['testes'], favorito: false },
  ]), 600))
}

async function inicializar() {
  try {
    if (spinner) spinner.hidden = false
    const links = await carregarLinks()
    renderizarLinks(links, lista)
  } catch (err) {
    if (erroBanner) { erroBanner.textContent = err.message; erroBanner.hidden = false }
  } finally {
    if (spinner) spinner.hidden = true
  }
}

inicializar()
