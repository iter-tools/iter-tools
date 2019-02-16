import { ensureIterable } from './internal/iterable'

export default function * chain (...arrayOfIter) {
  for (const iterable of arrayOfIter) {
    yield * ensureIterable(iterable)
  }
}
