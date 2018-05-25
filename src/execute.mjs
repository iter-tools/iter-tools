export default function * execute (func, ...args) {
  while (true) {
    yield func(...args)
  }
}
