// Capítulo 5 — Promises

// ─── Criando uma Promise ──────────────────────────────────────
function buscarLink(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, title: 'Link ' + id, url: 'https://exemplo.com/' + id })
      } else {
        reject(new Error('ID inválido: ' + id))
      }
    }, 100)
  })
}

// ─── Consumindo com .then / .catch / .finally ─────────────────
buscarLink(1)
  .then(link => {
    console.log('Link encontrado:', link.title)
    return link
  })
  .catch(err => {
    console.error('Erro:', err.message)
  })
  .finally(() => {
    console.log('Operação concluída (com ou sem erro)')
  })

// ─── Encadeamento ─────────────────────────────────────────────
buscarLink(1)
  .then(link => ({ ...link, carregado: true }))
  .then(link => ({ ...link, titulo: link.title.toUpperCase() }))
  .then(link => console.log(link))

// ─── Promise.resolve para valores em cache ───────────────────
const cacheLocal = new Map([[1, { id: 1, title: 'Do Cache' }]])

function buscarComCache(id) {
  if (cacheLocal.has(id)) {
    return Promise.resolve(cacheLocal.get(id))
  }
  return buscarLink(id)
}

// ─── Promise.all — paralelo, falha se um falhar ───────────────
Promise.all([buscarLink(1), buscarLink(2), buscarLink(3)])
  .then(links => console.log('Todos carregados:', links.length))
  .catch(err => console.error('Um falhou:', err.message))

// ─── Promise.allSettled — paralelo, não falha ────────────────
Promise.allSettled([buscarLink(1), buscarLink(-1), buscarLink(3)])
  .then(resultados => {
    resultados.forEach(r => {
      if (r.status === 'fulfilled') console.log('OK:', r.value.title)
      else console.log('Erro:', r.reason.message)
    })
  })

// ─── Promise.race — primeiro que resolver vence ──────────────
const timeout = ms => new Promise((_, reject) =>
  setTimeout(() => reject(new Error('Timeout após ' + ms + 'ms')), ms)
)

Promise.race([buscarLink(1), timeout(50)])
  .then(link => console.log('Vencedor:', link.title))
  .catch(err => console.log('Timeout ganhou:', err.message))
