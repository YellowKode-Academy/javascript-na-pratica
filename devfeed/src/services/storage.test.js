import { describe, it, expect, beforeEach, vi } from 'vitest'
import { storage } from './storage.js'

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('salva e carrega links corretamente', () => {
    const links = [
      { id: 1, title: 'MDN', url: 'https://mdn.io', tags: [], favorito: false }
    ]
    storage.salvarLinks(links)
    expect(storage.carregarLinks()).toEqual(links)
  })

  it('retorna array vazio se nao ha dados', () => {
    expect(storage.carregarLinks()).toEqual([])
  })

  it('retorna array vazio para JSON invalido', () => {
    localStorage.setItem('devfeed:links', 'isso nao e json {{{')
    expect(storage.carregarLinks()).toEqual([])
  })

  it('retorna array vazio para JSON null', () => {
    localStorage.setItem('devfeed:links', 'null')
    expect(storage.carregarLinks()).toEqual([])
  })

  it('retorna array vazio se valor nao for array', () => {
    localStorage.setItem('devfeed:links', JSON.stringify({ links: [] }))
    expect(storage.carregarLinks()).toEqual([])
  })

  it('salvar retorna true em caso de sucesso', () => {
    expect(storage.salvarLinks([])).toBe(true)
  })

  it('limpar remove todas as chaves devfeed', () => {
    storage.salvarLinks([{ id: 1, title: 'MDN', url: 'https://mdn.io', tags: [] }])
    storage.limpar()
    expect(localStorage.getItem('devfeed:links')).toBeNull()
  })

  it('salva timestamp de ultima sincronizacao', () => {
    storage.salvarLinks([])
    expect(storage.ultimaSync()).not.toBeNull()
  })
})
