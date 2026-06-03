// main.js — carregamento com Promises (cap-05)
import './style.css'
import { filtrarLinks } from './src/data/filters.js'
import { renderizarLinks } from './src/ui/render.js'

const spinner = document.querySelector('#spinner')
const lista = document.querySelector('#lista-links')

// Simula carregamento assíncrono com Promise
function carregarLinks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, url: 'https://developer.mozilla.org', title: 'MDN Web Docs', tags: ['javascript'], favorito: false },
        { id: 2, url: 'https://vite.dev', title: 'Vite', tags: ['ferramentas'], favorito: false },
        { id: 3, url: 'https://vitest.dev', title: 'Vitest', tags: ['testes'], favorito: false },
      ])
    }, 800)
  })
}

if (spinner) spinner.hidden = false

carregarLinks()
  .then(links => {
    if (spinner) spinner.hidden = true
    renderizarLinks(links, lista)
  })
  .catch(err => {
    if (spinner) spinner.hidden = true
    console.error('Falhou:', err.message)
  })
