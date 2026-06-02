// Mini store sem framework — Capítulo 9

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

export const store = criarStore({
  links: [],
  filtroTag: null,
  termoBusca: '',
  carregando: false,
  erro: null
})
