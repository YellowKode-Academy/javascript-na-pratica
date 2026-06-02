// Capítulo 3 — Funções Modernas

// ─── Destructuring de parâmetros ──────────────────────────────
function criarLink({ url, title, tags = [], favorito = false, createdAt = new Date() }) {
  return { id: Date.now(), url, title, tags, favorito, createdAt }
}

const link = criarLink({ url: 'https://go.dev', title: 'Go' })
console.log(link.tags)      // []
console.log(link.favorito)  // false

// Destructuring no corpo da função
const { id, url, title } = link
console.log(title)  // 'Go'

// Destructuring de arrays
const tags = ['backend', 'linguagem', 'compilado']
const [primeira, segunda, ...resto] = tags
console.log(primeira)  // 'backend'
console.log(resto)     // ['compilado']

// ─── Rest e spread ────────────────────────────────────────────
const linksBase = [{ id: 1 }, { id: 2 }]
const linksAtualizados = [...linksBase, { id: 3 }]

const linkBase = { id: 1, title: 'MDN' }
const linkComMeta = { ...linkBase, favorito: true }

// Rest em parâmetros
function processar({ url, title: t, ...restante }) {
  console.log(url, t)
  console.log(restante)
}
processar({ url: 'https://go.dev', title: 'Go', tags: ['backend'], favorito: false })

// ─── Arrow functions ──────────────────────────────────────────
const duplicar = n => n * 2
const somar = (a, b) => a + b

// Retorno implícito de objeto: envolver em parênteses
const toLinkSimples = url => ({ url, title: 'Sem título', tags: [] })

console.log(duplicar(5))    // 10
console.log(somar(3, 4))    // 7
console.log(toLinkSimples('https://go.dev'))

// ─── Funções puras vs impuras ─────────────────────────────────
// Pura: mesmo input → sempre mesmo output, sem efeitos colaterais
function filtrarPorTag(links, tag) {
  return links.filter(link => link.tags.includes(tag))
}

// Impura: modifica estado externo
let contadorGlobal = 0
function incrementar() {
  contadorGlobal++  // efeito colateral
}

const linksExemplo = [
  { id: 1, title: 'MDN', tags: ['javascript', 'web'] },
  { id: 2, title: 'Go', tags: ['backend', 'go'] }
]
console.log(filtrarPorTag(linksExemplo, 'javascript'))  // [{ id: 1, ... }]

// ─── Currying ─────────────────────────────────────────────────
const filtrarPorTagCurried = tag => links => links.filter(l => l.tags.includes(tag))

const filtrarJavascript = filtrarPorTagCurried('javascript')
const filtrarBackend = filtrarPorTagCurried('backend')

console.log(filtrarJavascript(linksExemplo))
console.log(filtrarBackend(linksExemplo))
