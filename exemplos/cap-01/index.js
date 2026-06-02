// Capítulo 1 — O JavaScript Que Você Não Sabia que Estava Usando

// ─── Optional chaining ?.  ────────────────────────────────────────────────
const link = {
  id: 1,
  url: 'https://developer.mozilla.org',
  title: 'MDN Web Docs',
  tags: ['referência', 'javascript', 'web'],
  createdAt: new Date('2026-01-15')
}

const linkSemTags = { id: 2, url: 'https://exemplo.com', title: 'Exemplo' }

// Sem optional chaining: TypeError se tags for undefined
// console.log(linkSemTags.tags.length) // TypeError!

// Com optional chaining: retorna undefined em vez de lançar erro
console.log(link?.tags?.length)         // 3
console.log(linkSemTags?.tags?.length)  // undefined

// Em métodos
console.log(link.formatarTitulo?.())    // undefined (método não existe, sem erro)

// Em arrays
console.log(link?.tags?.[0])            // 'referência'
console.log(linkSemTags?.tags?.[0])     // undefined

// ─── Nullish coalescing ??  ───────────────────────────────────────────────
const titulos = [
  link.title ?? 'Sem título',         // 'MDN Web Docs'
  linkSemTags.title ?? 'Sem título',  // 'Exemplo'
  undefined ?? 'Sem título',          // 'Sem título'
  null ?? 'Sem título',               // 'Sem título'
  '' ?? 'Sem título',                 // '' — string vazia é valor legítimo
  0 ?? 'Sem título',                  // 0 — zero é valor legítimo
]

// Diferença entre ?? e ||
const a = '' ?? 'padrão'   // '' — ?? só substitui null/undefined
const b = '' || 'padrão'   // 'padrão' — || substitui qualquer falsy

// ─── Logical assignment operators  ───────────────────────────────────────
const config = { timeout: null, debug: undefined }

config.timeout ??= 5000   // 5000 — era null
config.debug ||= false    // false — era undefined (falsy)
config.timeout ??= 9999   // ainda 5000 — já tinha valor

// ─── Array.at()  ─────────────────────────────────────────────────────────
const links = [
  { id: 1, title: 'MDN' },
  { id: 2, title: 'Vite' },
  { id: 3, title: 'Vitest' },
]

console.log(links.at(-1).title)   // 'Vitest' — último
console.log(links.at(-2).title)   // 'Vite' — penúltimo
console.log(links.at(0).title)    // 'MDN' — primeiro

// ─── Object.hasOwn()  ────────────────────────────────────────────────────
const linkComId = { id: 1, title: 'MDN' }
const linkSemId = Object.create({ herdado: true })

console.log(Object.hasOwn(linkComId, 'id'))      // true
console.log(Object.hasOwn(linkSemId, 'herdado')) // false — propriedade herdada

// ─── structuredClone()  ──────────────────────────────────────────────────
const original = {
  id: 1,
  title: 'MDN',
  tags: ['javascript'],
  createdAt: new Date('2026-01-15')
}

// Jeito antigo — perde o tipo Date
const copiaAntiga = JSON.parse(JSON.stringify(original))
console.log(copiaAntiga.createdAt instanceof Date) // false — virou string

// structuredClone — preserva tipos
const copia = structuredClone(original)
console.log(copia.createdAt instanceof Date) // true
console.log(copia.tags === original.tags)    // false — cópia independente

copia.tags.push('web')
console.log(original.tags) // ['javascript'] — original intacto
