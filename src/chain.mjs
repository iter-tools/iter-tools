import iter from './iter'

export default function * chain (...args) {
  for (const iterable of args) {
    yield * iter(iterable)
  }
}
