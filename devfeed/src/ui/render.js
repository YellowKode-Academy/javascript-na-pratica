// src/ui/render.js (cap-06)
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
  li.innerHTML = `
    <a href="${link.url}" target="_blank" rel="noopener">${link.title}</a>
    <div class="tags">${link.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    <button class="btn-remover" data-id="${link.id}">Remover</button>
  `
  return li
}
