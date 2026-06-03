import { describe, it, expect } from 'vitest'
import { filtrarLinks, ordenarLinks, extrairTodasTags } from './filters.js'

const links = [
  { id: 1, title: 'MDN Web Docs', url: 'https://mdn.io', tags: ['javascript', 'referencia'] },
  { id: 2, title: 'Vite', url: 'https://vite.dev', tags: ['ferramentas'] },
  { id: 3, title: 'Go', url: 'https://go.dev', tags: ['backend', 'go'] }
]

describe('filtrarLinks', () => {
  it('retorna todos quando sem filtros', () => {
    expect(filtrarLinks(links, {})).toHaveLength(3)
  })

  it('filtra por tag', () => {
    const resultado = filtrarLinks(links, { tag: 'javascript' })
    expect(resultado).toHaveLength(1)
    expect(resultado[0].id).toBe(1)
  })

  it('retorna vazio para tag inexistente', () => {
    expect(filtrarLinks(links, { tag: 'ruby' })).toHaveLength(0)
  })

  it('filtra por termo no titulo', () => {
    const resultado = filtrarLinks(links, { termo: 'vite' })
    expect(resultado).toHaveLength(1)
    expect(resultado[0].id).toBe(2)
  })

  it('filtra por termo na url', () => {
    const resultado = filtrarLinks(links, { termo: 'go.dev' })
    expect(resultado).toHaveLength(1)
    expect(resultado[0].id).toBe(3)
  })

  it('busca e insensivel a maiusculas', () => {
    const resultado = filtrarLinks(links, { termo: 'MDN' })
    expect(resultado).toHaveLength(1)
  })

  it('combina tag e termo', () => {
    const resultado = filtrarLinks(links, { tag: 'ferramentas', termo: 'vite' })
    expect(resultado).toHaveLength(1)
    expect(resultado[0].id).toBe(2)
  })

  it('nao muta o array original', () => {
    filtrarLinks(links, { tag: 'javascript' })
    expect(links).toHaveLength(3)
  })
})

describe('extrairTodasTags', () => {
  it('extrai tags unicas', () => {
    const tags = extrairTodasTags(links)
    expect(tags).toContain('javascript')
    expect(tags).toContain('ferramentas')
    expect(tags).toContain('backend')
  })

  it('nao repete tags', () => {
    const linksComRepetidas = [
      { id: 1, tags: ['js', 'web'] },
      { id: 2, tags: ['js', 'node'] }
    ]
    const tags = extrairTodasTags(linksComRepetidas)
    expect(tags.filter(t => t === 'js')).toHaveLength(1)
  })

  it('retorna array vazio para links sem tags', () => {
    expect(extrairTodasTags([])).toEqual([])
  })
})

describe('ordenarLinks', () => {
  it('ordena por createdAt decrescente por padrao', () => {
    const linksComData = [
      { id: 1, title: 'A', tags: [], createdAt: '2026-01-01' },
      { id: 2, title: 'B', tags: [], createdAt: '2026-01-03' },
      { id: 3, title: 'C', tags: [], createdAt: '2026-01-02' }
    ]
    const resultado = ordenarLinks(linksComData, 'createdAt', 'desc')
    expect(resultado[0].id).toBe(2)
    expect(resultado[2].id).toBe(1)
  })

  it('nao muta o array original', () => {
    const original = [...links]
    ordenarLinks(links, 'title', 'asc')
    expect(links[0].id).toBe(original[0].id)
  })
})
