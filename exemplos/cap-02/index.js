// Capítulo 2 — Tipos, Referências e o Bug Que Todo Mundo Já Teve

// ─── Primitivos vs referências ────────────────────────────────
let a = 42
let b = a
b = 100
console.log(a)  // 42 — cópia independente do valor

let link1 = { title: 'MDN' }
let link2 = link1          // copia o endereço, não o objeto
link2.title = 'Modificado'
console.log(link1.title)   // 'Modificado' — mesmo endereço de memória

// ─── === para objetos compara endereços, não conteúdo ─────────
console.log({} === {})     // false — endereços diferentes
const x = { id: 1 }
const y = x
console.log(x === y)       // true — mesmo endereço

// ─── Mutação silenciosa ───────────────────────────────────────
function marcarFavoritoErrado(link) {
  link.favorito = true   // muta o original
  return link
}

const meuLink = { id: 1, title: 'MDN' }
marcarFavoritoErrado(meuLink)
console.log(meuLink.favorito)  // true — original alterado sem querer

// ─── Cópia rasa com spread ────────────────────────────────────
function marcarFavoritoCerto(link) {
  return { ...link, favorito: true }  // objeto novo
}

const meuLink2 = { id: 1, title: 'MDN' }
const favorito = marcarFavoritoCerto(meuLink2)
console.log(meuLink2.favorito)  // undefined — original intacto
console.log(favorito.favorito)  // true

// Limitação: spread é cópia rasa (1 nível)
const linkComTags = { id: 1, tags: ['javascript'] }
const copia = { ...linkComTags }
copia.tags.push('web')
console.log(linkComTags.tags)  // ['javascript', 'web'] — tags compartilhadas!

// ─── Cópia profunda com structuredClone ──────────────────────
const linkOriginal = { id: 1, tags: ['javascript'], meta: { views: 0 } }
const copiaTotal = structuredClone(linkOriginal)
copiaTotal.tags.push('web')
copiaTotal.meta.views = 10
console.log(linkOriginal.tags)        // ['javascript'] — intacto
console.log(linkOriginal.meta.views)  // 0 — intacto

// ─── Imutabilidade em arrays ──────────────────────────────────
const links = [{ id: 1, title: 'MDN' }, { id: 2, title: 'Vite' }]

// Adicionar sem mutar
const comNovo = [...links, { id: 3, title: 'Vitest' }]

// Remover sem mutar
const semId2 = links.filter(l => l.id !== 2)

// Atualizar sem mutar
const atualizado = links.map(l =>
  l.id === 1 ? { ...l, title: 'MDN Web Docs' } : l
)

console.log(links.length)           // 2 — original intacto
console.log(comNovo.length)         // 3
console.log(semId2.length)          // 1
console.log(atualizado[0].title)    // 'MDN Web Docs'
