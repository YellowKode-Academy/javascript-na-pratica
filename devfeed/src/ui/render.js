// src/ui/render.js — renderizacao DOM (cap-04)
export function renderizarLinks(links, containerEl) {
  if (!containerEl) return
  const fragment = document.createDocumentFragment()
  links.forEach(link => fragment.appendChild(criarItemLink(link)))
  containerEl.innerHTML = ''
  containerEl.appendChild(fragment)
}

function criarItemLink(link) {
  const li = document.createElement('li')
  li.dataset.id = link.id
  const tagsHtml = link.tags.map(tag =>
    `<span class="tag" data-tag="${tag}">${tag}</span>`
  ).join('')
  li.innerHTML = `
    <a href="${link.url}" target="_blank" rel="noopener">${link.title}</a>
    <div class="tags">${tagsHtml}</div>
    <button class="btn-remover" data-id="${link.id}">Remover</button>
  `
  return li
}
