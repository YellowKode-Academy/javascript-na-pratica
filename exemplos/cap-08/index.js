// Capítulo 8 — Error Handling

// ─── Classes de erro customizadas ────────────────────────────
class AppError extends Error {
  constructor(message, code) {
    super(message)
    this.name = 'AppError'
    this.code = code
  }
}

class ApiError extends AppError {
  constructor(status, message) {
    super(message || 'Erro de API', 'API_ERROR')
    this.name = 'ApiError'
    this.status = status
  }
}

class NetworkError extends AppError {
  constructor(message) {
    super(message || 'Sem conexão com a internet', 'NETWORK_ERROR')
    this.name = 'NetworkError'
  }
}

// ─── Wrapper de fetch com erros tipados ──────────────────────
async function fetchComErro(url, opcoes) {
  try {
    const res = await fetch(url, opcoes)
    if (!res.ok) throw new ApiError(res.status)
    return res.json()
  } catch (err) {
    if (err instanceof ApiError) throw err
    throw new NetworkError(err.message)
  }
}

// ─── Tratamento diferenciado por tipo ────────────────────────
async function carregarLinks() {
  try {
    return await fetchComErro('/api/links')
  } catch (err) {
    if (err instanceof NetworkError) {
      console.warn('Sem internet. Usando cache local.')
      return carregarDoCache()
    }
    if (err instanceof ApiError && err.status === 401) {
      console.error('Sessao expirada.')
      return []
    }
    if (err instanceof ApiError && err.status >= 500) {
      console.error('Servidor com problema.')
    }
    return []
  }
}

function carregarDoCache() {
  try {
    const raw = localStorage.getItem('devfeed:links')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

// ─── Retry com backoff exponencial ───────────────────────────
async function comRetry(fn, { tentativas = 3, delayBase = 300 } = {}) {
  for (let i = 0; i < tentativas; i++) {
    try {
      return await fn()
    } catch (err) {
      const ultima = i === tentativas - 1
      if (ultima || err instanceof ApiError) throw err
      const delay = delayBase * Math.pow(2, i)
      await new Promise(r => setTimeout(r, delay))
    }
  }
}

// ─── Circuit breaker ─────────────────────────────────────────
function criarCircuitBreaker(fn, { limite = 5, janela = 60000 } = {}) {
  let falhas = 0
  let abertaDesde = null

  return async function (...args) {
    if (abertaDesde && Date.now() - abertaDesde < janela) {
      throw new AppError('Servico temporariamente indisponivel.', 'CIRCUIT_OPEN')
    }
    try {
      const resultado = await fn(...args)
      falhas = 0
      abertaDesde = null
      return resultado
    } catch (err) {
      falhas++
      if (falhas >= limite) abertaDesde = Date.now()
      throw err
    }
  }
}

module.exports = { AppError, ApiError, NetworkError, comRetry, criarCircuitBreaker }
