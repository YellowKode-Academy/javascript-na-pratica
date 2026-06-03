// src/data/filters.js — funções puras de filtro (cap-03)
export function filtrarLinks(links, { tag, termo } = {}) {
  return links.filter(link => {
    if (tag && !link.tags.includes(tag)) return false
    if (termo) {
      const t = termo.toLowerCase()
      return link.title.toLowerCase().includes(t) ||
             link.url.toLowerCase().includes(t) ||
             link.tags.some(tg => tg.toLowerCase().includes(t))
    }
    return true
  })
}

export function ordenarLinks(links, campo = 'createdAt', direcao = 'desc') {
  return [...links].sort((a, b) => {
    if (a[campo] < b[campo]) return direcao === 'asc' ? -1 : 1
    if (a[campo] > b[campo]) return direcao === 'asc' ? 1 : -1
    return 0
  })
}

export function extrairTodasTags(links) {
  const tags = new Set(links.flatMap(l => l.tags))
  return [...tags].sort()
}
