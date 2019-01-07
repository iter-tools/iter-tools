const factorialCache = new Map()

export default function factorial (n) {
  if (n === 0 || n === 1) return 1
  if (!factorialCache.has(n)) {
    factorialCache.set(n, n * factorial(n - 1))
  }
  return factorialCache.get(n)
}
