// src/services/api.js — Fetch API com error handling (cap-08)
const API_URL = import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com'

class ApiError extends Error {
  constructor(status, message) {
    super(message || 'Erro de API')
    this.name = 'ApiError'
    this.status = status
  }
}

class NetworkError extends Error {
  constructor(message) {
    super(message || 'Sem conexao com a internet')
    this.name = 'NetworkError'
  }
}

async function request(caminho, opcoes = {}) {
  try {
    const res = await fetch(API_URL + caminho, {
      headers: { 'Content-Type': 'application/json' },
      ...opcoes
    })
    if (!res.ok) throw new ApiError(res.status)
    return res.status === 204 ? null : res.json()
  } catch (err) {
    if (err instanceof ApiError) throw err
    throw new NetworkError(err.message)
  }
}

async function comRetry(fn, tentativas = 3) {
  for (let i = 0; i < tentativas; i++) {
    try { return await fn() }
    catch (err) {
      if (i === tentativas - 1 || err instanceof ApiError) throw err
      await new Promise(r => setTimeout(r, 300 * Math.pow(2, i)))
    }
  }
}

export const api = {
  listar: () => comRetry(() => request('/todos?_limit=20')),
  criar: dados => request('/todos', { method: 'POST', body: JSON.stringify(dados) }),
  atualizar: (id, dados) => request('/todos/' + id, { method: 'PATCH', body: JSON.stringify(dados) }),
  remover: id => request('/todos/' + id, { method: 'DELETE' })
}

export { ApiError, NetworkError }
