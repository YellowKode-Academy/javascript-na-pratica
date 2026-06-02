// Persistência com localStorage — Capítulo 11
import { store } from '../store/index.js'

const CHAVES = {
  links: 'devfeed:links',
  ultimaSync: 'devfeed:ultima-sync'
}

export const storage = {
  salvarLinks(links) {
    try {
      localStorage.setItem(CHAVES.links, JSON.stringify(links))
      localStorage.setItem(CHAVES.ultimaSync, new Date().toISOString())
      return true
    } catch (err) {
      console.warn('Falha ao salvar links no localStorage:', err.message)
      return false
    }
  },

  carregarLinks() {
    try {
      const raw = localStorage.getItem(CHAVES.links)
      if (!raw) return []
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      console.warn('Links no localStorage corrompidos. Iniciando com lista vazia.')
      localStorage.removeItem(CHAVES.links)
      return []
    }
  },

  ultimaSync() {
    return localStorage.getItem(CHAVES.ultimaSync)
  },

  limpar() {
    Object.values(CHAVES).forEach(chave => localStorage.removeItem(chave))
  }
}

// Sincronizar entre abas abertas — Capítulo 11
if (typeof window !== 'undefined') {
  window.addEventListener('storage', e => {
    if (e.key === CHAVES.links && e.newValue !== null) {
      try {
        const linksAtualizados = JSON.parse(e.newValue)
        if (Array.isArray(linksAtualizados)) {
          store.setState({ links: linksAtualizados })
        }
      } catch {
        // dado invalido vindo de outra aba, ignorar
      }
    }
  })
}
