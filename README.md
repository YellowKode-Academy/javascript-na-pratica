# JavaScript na Prática — Repositório Companion

Código do livro **JavaScript na Prática** (Série Dev na Prática, Vol.1).

Kelvin Biffi | YellowKode Academy

---

## Estrutura

```
exemplos/          Snippets isolados por capítulo
devfeed/           Projeto completo — o DevFeed
```

## O Projeto: DevFeed

Agregador pessoal de links e notas construído ao longo dos 16 capítulos do livro.
Cada capítulo adiciona uma camada: ES2022+, módulos, fetch, estado, localStorage, testes, service worker e deploy.

### Como rodar

```bash
cd devfeed
npm install
npm run dev
```

Acesse `http://localhost:5173`.

### Build e deploy

```bash
npm run build     # gera dist/
npm run preview   # serve dist/ localmente
```

### Testes

```bash
npm test              # roda uma vez
npm run test:watch    # modo watch
npm run test:coverage # relatório de cobertura
```

---

## Exemplos por capítulo

| Pasta | Capítulo |
|---|---|
| `exemplos/cap-01` | ES2022+: `?.`, `??`, `??=`, `Array.at()`, `structuredClone()` |
| `exemplos/cap-02` | Tipos, referências e imutabilidade |
| `exemplos/cap-03` | Funções modernas: arrow, default params, rest/spread, currying |
| `exemplos/cap-05` | Promises: criação, encadeamento, `Promise.all` |
| `exemplos/cap-06` | async/await: padrões e armadilhas |
| `exemplos/cap-07` | Fetch API: CRUD completo |
| `exemplos/cap-08` | Error handling: classes, retry, circuit breaker |
| `exemplos/cap-09` | Estado sem framework: Observer e mini store |
| `exemplos/cap-12` | Performance: debounce, throttle, lazy loading |

---

Livro disponível na Amazon KDP — Série **Dev na Prática**.
