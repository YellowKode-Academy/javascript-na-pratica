// src/utils/debounce.js (cap-12)
export function debounce(fn, ms) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), ms)
  }
}

export function throttle(fn, ms) {
  let last = 0
  return function (...args) {
    const agora = Date.now()
    if (agora - last < ms) return
    last = agora
    return fn.apply(this, args)
  }
}
