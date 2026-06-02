// Capítulo 6 — async/await

// ─── A mesma lógica de Promise, mais legível ──────────────────
async function buscarLink(id) {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/' + id)
  if (!res.ok) throw new Error('HTTP ' + res.status)
  return res.json()
}

// ─── try/catch para tratar erros ─────────────────────────────
async function carregarLink(id) {
  try {
    const link = await buscarLink(id)
    console.log('Carregado:', link.title)
    return link
  } catch (err) {
    console.error('Falhou:', err.message)
    return null
  }
}

// ─── Armadilha: await em loop (sequencial quando poderia ser paralelo)
async function carregarTodosSequencial(ids) {
  const links = []
  for (const id of ids) {
    const link = await buscarLink(id)  // espera um por um — N vezes mais lento
    links.push(link)
  }
  return links
}

// Correto: paralelo com Promise.all
async function carregarTodosParalelo(ids) {
  const promises = ids.map(id => buscarLink(id))
  return Promise.all(promises)  // todos ao mesmo tempo
}

// ─── Paralelo com destruturação ───────────────────────────────
async function carregarDashboard() {
  const [links, config] = await Promise.all([
    fetch('/api/links').then(r => r.json()).catch(() => []),
    fetch('/api/config').then(r => r.json()).catch(() => ({}))
  ])
  return { links, config }
}

// ─── async sem await retorna Promise ─────────────────────────
async function obterTimestamp() {
  return Date.now()  // retorna Promise<number>
}
obterTimestamp().then(ts => console.log('Timestamp:', ts))

// ─── Retry com backoff exponencial ───────────────────────────
async function comRetry(fn, tentativas = 3, delayBase = 300) {
  for (let i = 0; i < tentativas; i++) {
    try {
      return await fn()
    } catch (err) {
      if (i === tentativas - 1) throw err
      const delay = delayBase * Math.pow(2, i)
      console.warn('Tentativa ' + (i + 1) + ' falhou. Aguardando ' + delay + 'ms...')
      await new Promise(r => setTimeout(r, delay))
    }
  }
}

carregarLink(1)
