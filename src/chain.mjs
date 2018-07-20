import iter from './internal/iter'

export default function * chain (...arrayOfIter) {
  for (const iterable of arrayOfIter) {
    yield * iter(iterable)
  }
}
