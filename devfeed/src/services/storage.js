// src/services/storage.js — localStorage com sincronizacao entre abas (cap-11)
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
      console.warn('Falha ao salvar links:', err.message)
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
      console.warn('Links corrompidos. Iniciando com lista vazia.')
      localStorage.removeItem(CHAVES.links)
      return []
    }
  },
  ultimaSync: () => localStorage.getItem(CHAVES.ultimaSync),
  limpar: () => Object.values(CHAVES).forEach(k => localStorage.removeItem(k))
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', e => {
    if (e.key === CHAVES.links && e.newValue) {
      try {
        const links = JSON.parse(e.newValue)
        if (Array.isArray(links)) store.setState({ links })
      } catch {}
    }
  })
}
