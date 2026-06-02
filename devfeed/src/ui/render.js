// Renderizacao de DOM eficiente — Capitulos 4 e 10
import { extrairTodasTags } from '../data/filters.js'

export function renderizarLinks(links, containerEl) {
  if (!containerEl) return

  const semResultados = document.querySelector('#sem-resultados')
  if (links.length === 0) {
    containerEl.innerHTML = ''
    if (semResultados) semResultados.hidden = false
    return
  }
  if (semResultados) semResultados.hidden = true

  const fragment = document.createDocumentFragment()
  links.forEach(link => fragment.appendChild(criarItemLink(link)))
  containerEl.innerHTML = ''
  containerEl.appendChild(fragment)
}

function criarItemLink(link) {
  const li = document.createElement('li')
  li.className = 'link-item'
  li.dataset.id = link.id

  const tagsHtml = link.tags.map(tag =>
    `<span class="tag" data-tag="${tag}">${tag}</span>`
  ).join('')

  li.innerHTML = `
    <a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.title}</a>
    <div class="acoes">
      <button class="btn-remover" data-id="${link.id}" title="Remover">x</button>
    </div>
    <div class="tags">${tagsHtml}</div>
  `
  return li
}

export function renderizarTags(links, containerEl, tagAtiva) {
  if (!containerEl) return
  const tags = extrairTodasTags(links)
  containerEl.innerHTML = ''
  const fragment = document.createDocumentFragment()
  tags.forEach(tag => {
    const li = document.createElement('li')
    li.textContent = tag
    li.dataset.tag = tag
    if (tag === tagAtiva) li.classList.add('ativo')
    fragment.appendChild(li)
  })
  containerEl.appendChild(fragment)
}

export function atualizarContagem(total, visiveis, containerEl) {
  if (!containerEl) return
  containerEl.textContent = total === visiveis
    ? total + ' link' + (total !== 1 ? 's' : '')
    : visiveis + ' de ' + total + ' links'
}
