// Funções puras de CRUD para links — Capítulos 2, 3 e 4

/**
 * Adiciona um link ao array sem mutar o original.
 * @param {Array} links - Array atual de links
 * @param {{ url: string, title: string, tags?: string[] }} dados - Dados do novo link
 * @returns {Array} Novo array com o link adicionado
 */
export function addLink(links, dados) {
  const novoLink = {
    id: Date.now(),
    favorito: false,
    createdAt: new Date().toISOString(),
    tags: [],
    ...dados
  }
  return [...links, novoLink]
}

/**
 * Remove um link pelo id sem mutar o original.
 */
export function removeLink(links, id) {
  return links.filter(link => link.id !== id)
}

/**
 * Atualiza campos de um link pelo id sem mutar o original.
 */
export function updateLink(links, id, mudancas) {
  return links.map(link =>
    link.id === id ? { ...link, ...mudancas } : link
  )
}

/**
 * Alterna o estado de favorito de um link.
 */
export function toggleFavorito(links, id) {
  return links.map(link =>
    link.id === id ? { ...link, favorito: !link.favorito } : link
  )
}
