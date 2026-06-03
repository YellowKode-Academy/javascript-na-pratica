// src/services/api.js — Fetch API basica (cap-07)
const API_URL = import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com'

async function request(caminho, opcoes = {}) {
  const res = await fetch(API_URL + caminho, {
    headers: { 'Content-Type': 'application/json' },
    ...opcoes
  })
  if (!res.ok) throw new Error('HTTP ' + res.status)
  return res.status === 204 ? null : res.json()
}

export const api = {
  listar: () => request('/todos?_limit=20'),
  criar: dados => request('/todos', { method: 'POST', body: JSON.stringify(dados) }),
  atualizar: (id, dados) => request('/todos/' + id, { method: 'PATCH', body: JSON.stringify(dados) }),
  remover: id => request('/todos/' + id, { method: 'DELETE' })
}
