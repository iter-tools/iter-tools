export default async function * asyncExecute (func, ...args) {
  while (true) {
    yield await func(...args)
  }
}
