export default async function * execute (func, ...args) {
  while (true) {
    yield func(...args)
  }
}
