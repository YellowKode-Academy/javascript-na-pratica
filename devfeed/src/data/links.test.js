import { describe, it, expect } from 'vitest'
import { addLink, removeLink, updateLink, toggleFavorito } from './links.js'

describe('addLink', () => {
  it('adiciona link ao array sem mutar o original', () => {
    const original = [{ id: 1, title: 'MDN', url: 'https://mdn.io', tags: [] }]
    const resultado = addLink(original, { title: 'Vite', url: 'https://vite.dev' })

    expect(resultado).toHaveLength(2)
    expect(original).toHaveLength(1)
    expect(resultado[1].title).toBe('Vite')
  })

  it('gera id unico para o novo link', () => {
    const resultado = addLink([], { title: 'Teste', url: 'https://test.com' })
    expect(resultado[0].id).toBeDefined()
  })

  it('define tags como array vazio por padrao', () => {
    const resultado = addLink([], { title: 'Teste', url: 'https://test.com' })
    expect(resultado[0].tags).toEqual([])
  })

  it('define favorito como false por padrao', () => {
    const resultado = addLink([], { title: 'Teste', url: 'https://test.com' })
    expect(resultado[0].favorito).toBe(false)
  })

  it('preserva tags passadas', () => {
    const resultado = addLink([], {
      title: 'Teste',
      url: 'https://test.com',
      tags: ['javascript', 'web']
    })
    expect(resultado[0].tags).toEqual(['javascript', 'web'])
  })
})

describe('removeLink', () => {
  it('remove link pelo id sem mutar o original', () => {
    const links = [
      { id: 1, title: 'MDN', url: 'https://mdn.io', tags: [] },
      { id: 2, title: 'Vite', url: 'https://vite.dev', tags: [] }
    ]
    const resultado = removeLink(links, 1)

    expect(resultado).toHaveLength(1)
    expect(resultado[0].id).toBe(2)
    expect(links).toHaveLength(2)
  })

  it('retorna array vazio ao remover o unico elemento', () => {
    const links = [{ id: 1, title: 'MDN', url: 'https://mdn.io', tags: [] }]
    expect(removeLink(links, 1)).toHaveLength(0)
  })

  it('retorna array inalterado se id nao existe', () => {
    const links = [{ id: 1, title: 'MDN', url: 'https://mdn.io', tags: [] }]
    const resultado = removeLink(links, 999)
    expect(resultado).toHaveLength(1)
  })
})

describe('updateLink', () => {
  it('atualiza campos do link pelo id', () => {
    const links = [{ id: 1, title: 'MDN', url: 'https://mdn.io', tags: [] }]
    const resultado = updateLink(links, 1, { title: 'MDN Web Docs' })

    expect(resultado[0].title).toBe('MDN Web Docs')
    expect(resultado[0].url).toBe('https://mdn.io')
  })

  it('nao muta o objeto original dentro do array', () => {
    const link = { id: 1, title: 'MDN', url: 'https://mdn.io', tags: [] }
    const links = [link]
    updateLink(links, 1, { title: 'Alterado' })

    expect(link.title).toBe('MDN')
  })

  it('nao altera links com id diferente', () => {
    const links = [
      { id: 1, title: 'MDN', url: 'https://mdn.io', tags: [] },
      { id: 2, title: 'Vite', url: 'https://vite.dev', tags: [] }
    ]
    const resultado = updateLink(links, 1, { title: 'MDN Web Docs' })

    expect(resultado[1].title).toBe('Vite')
  })
})

describe('toggleFavorito', () => {
  it('alterna favorito de false para true', () => {
    const links = [{ id: 1, title: 'MDN', url: 'https://mdn.io', tags: [], favorito: false }]
    const resultado = toggleFavorito(links, 1)
    expect(resultado[0].favorito).toBe(true)
  })

  it('alterna favorito de true para false', () => {
    const links = [{ id: 1, title: 'MDN', url: 'https://mdn.io', tags: [], favorito: true }]
    const resultado = toggleFavorito(links, 1)
    expect(resultado[0].favorito).toBe(false)
  })
})
