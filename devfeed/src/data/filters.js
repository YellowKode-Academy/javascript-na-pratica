// Funções puras de filtro e ordenação — Capítulo 3

/**
 * Filtra links por tag e/ou termo de busca.
 * @param {Array} links
 * @param {{ tag?: string, termo?: string }} opcoes
 * @returns {Array}
 */
export function filtrarLinks(links, { tag, termo } = {}) {
  return links.filter(link => {
    if (tag && !link.tags.includes(tag)) return false
    if (termo) {
      const t = termo.toLowerCase()
      const noTitulo = link.title.toLowerCase().includes(t)
      const naUrl = link.url.toLowerCase().includes(t)
      const nasTags = link.tags.some(tg => tg.toLowerCase().includes(t))
      if (!noTitulo && !naUrl && !nasTags) return false
    }
    return true
  })
}

/**
 * Ordena links por campo.
 * @param {Array} links
 * @param {'createdAt' | 'title'} campo
 * @param {'asc' | 'desc'} direcao
 */
export function ordenarLinks(links, campo = 'createdAt', direcao = 'desc') {
  return [...links].sort((a, b) => {
    const va = a[campo]
    const vb = b[campo]
    if (va < vb) return direcao === 'asc' ? -1 : 1
    if (va > vb) return direcao === 'asc' ? 1 : -1
    return 0
  })
}

/**
 * Extrai todas as tags únicas de um array de links, ordenadas.
 */
export function extrairTodasTags(links) {
  const tags = new Set(links.flatMap(l => l.tags))
  return [...tags].sort()
}
