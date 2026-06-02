// Capítulo 12 — Performance: Debounce, Throttle e Lazy Loading

// ─── Debounce: espera o usuário parar de digitar ──────────────
function debounce(fn, ms) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), ms)
  }
}

// Busca executa apenas 300ms após o usuário parar de digitar
const buscarLinks = debounce((termo) => {
  console.log('Buscando:', termo)
}, 300)

buscarLinks('j')
buscarLinks('ja')
buscarLinks('jav')
buscarLinks('javascript')  // só esta executa

// ─── Throttle: executa no máximo 1x por período ───────────────
function throttle(fn, ms) {
  let last = 0
  return function (...args) {
    const agora = Date.now()
    if (agora - last < ms) return
    last = agora
    return fn.apply(this, args)
  }
}

// Scroll dispara no máximo 1x a cada 100ms
const aoRolar = throttle(() => {
  if (typeof window !== 'undefined') console.log('Scroll:', window.scrollY)
}, 100)

// ─── Memoização ───────────────────────────────────────────────
function memoizar(fn) {
  const cache = new Map()
  return function (...args) {
    const chave = JSON.stringify(args)
    if (cache.has(chave)) return cache.get(chave)
    const resultado = fn(...args)
    cache.set(chave, resultado)
    return resultado
  }
}

const filtrarLinksMemo = memoizar((links, tag) =>
  links.filter(l => l.tags.includes(tag))
)

const links = [
  { id: 1, title: 'MDN', tags: ['javascript'] },
  { id: 2, title: 'Vite', tags: ['ferramentas'] }
]

console.log(filtrarLinksMemo(links, 'javascript'))  // calcula
console.log(filtrarLinksMemo(links, 'javascript'))  // cache

// ─── DocumentFragment para inserções em lote ─────────────────
// Em browser: usar fragment evita N recalculos de layout
// function renderizarLinksBatch(links, container) {
//   const fragment = document.createDocumentFragment()
//   links.forEach(link => {
//     const li = document.createElement('li')
//     li.textContent = link.title
//     fragment.appendChild(li)
//   })
//   container.innerHTML = ''
//   container.appendChild(fragment)  // uma inserção no DOM
// }

module.exports = { debounce, throttle, memoizar }
