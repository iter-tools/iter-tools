export default function pipeline (...fns) {
  return fns.reverse().reduce((f, g) => (...args) => f(g(...args)))
}
