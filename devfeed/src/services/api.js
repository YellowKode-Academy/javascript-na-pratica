// Fetch API com tratamento de erros — Capítulos 7 e 8
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
  buscar: id => request('/todos/' + id),
  criar: dados => request('/todos', { method: 'POST', body: JSON.stringify(dados) }),
  atualizar: (id, dados) => request('/todos/' + id, { method: 'PATCH', body: JSON.stringify(dados) }),
  remover: id => request('/todos/' + id, { method: 'DELETE' })
}
