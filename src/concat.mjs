import { ensureIterable } from './internal/iterable'

export default function * concat (...arrayOfIter) {
  for (const iterable of arrayOfIter) {
    yield * ensureIterable(iterable)
  }
}
