// Capítulo 9 — Estado da Aplicação Sem Framework

// ─── Observable: valor que notifica quem assina ───────────────
function criarObservavel(valorInicial) {
  let valor = valorInicial
  const ouvintes = []

  return {
    get: () => valor,
    set: (novoValor) => {
      valor = novoValor
      ouvintes.forEach(fn => fn(valor))
    },
    subscribe: (fn) => {
      ouvintes.push(fn)
      return () => ouvintes.splice(ouvintes.indexOf(fn), 1)
    }
  }
}

const filtroAtivo = criarObservavel(null)

const cancelar = filtroAtivo.subscribe(tag => {
  console.log('Filtro mudou para:', tag)
})

filtroAtivo.set('javascript')  // Filtro mudou para: javascript
filtroAtivo.set('backend')     // Filtro mudou para: backend
cancelar()
filtroAtivo.set('go')          // silencio — ouvinte cancelado

// ─── Mini Store ───────────────────────────────────────────────
function criarStore(estadoInicial) {
  let estado = { ...estadoInicial }
  const ouvintes = new Set()

  return {
    getState: () => ({ ...estado }),
    setState: (mudancas) => {
      estado = { ...estado, ...mudancas }
      ouvintes.forEach(fn => fn(estado))
    },
    subscribe: (fn) => {
      ouvintes.add(fn)
      return () => ouvintes.delete(fn)
    }
  }
}

// ─── Store do DevFeed ─────────────────────────────────────────
const store = criarStore({
  links: [],
  filtroTag: null,
  termoBusca: '',
  carregando: false,
  erro: null
})

store.subscribe(estado => {
  const visiveis = estado.links.filter(l => {
    if (estado.filtroTag && !l.tags.includes(estado.filtroTag)) return false
    if (estado.termoBusca) {
      const termo = estado.termoBusca.toLowerCase()
      return l.title.toLowerCase().includes(termo)
    }
    return true
  })
  console.log('Links visiveis:', visiveis.length)
})

store.setState({
  links: [
    { id: 1, title: 'MDN Web Docs', tags: ['javascript', 'referencia'] },
    { id: 2, title: 'Vite', tags: ['ferramentas'] },
    { id: 3, title: 'Go', tags: ['backend', 'go'] }
  ]
})

store.setState({ filtroTag: 'javascript' })  // 1 visivel
store.setState({ filtroTag: null, termoBusca: 'vite' })  // 1 visivel

module.exports = { criarObservavel, criarStore }
