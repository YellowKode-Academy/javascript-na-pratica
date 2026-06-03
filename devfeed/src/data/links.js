// src/data/links.js — funções puras de CRUD (cap-02, cap-03)
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

export function removeLink(links, id) {
  return links.filter(link => link.id !== id)
}

export function updateLink(links, id, mudancas) {
  return links.map(link =>
    link.id === id ? { ...link, ...mudancas } : link
  )
}

export function toggleFavorito(links, id) {
  return links.map(link =>
    link.id === id ? { ...link, favorito: !link.favorito } : link
  )
}
