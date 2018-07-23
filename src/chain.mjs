import ensureIterable from './internal/ensure-iterable'

export default function * chain (...arrayOfIter) {
  for (const iterable of arrayOfIter) {
    yield * ensureIterable(iterable)
  }
}
