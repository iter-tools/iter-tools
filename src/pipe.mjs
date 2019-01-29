export default function pipe (...fns) {
  return fns.reduce((f, g) => (...args) => g(f(...args)))
}
