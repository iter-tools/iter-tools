import asyncSlice from './async-slice'
import asyncTee from './async-tee'
import ensureAsyncIterable from './internal/ensure-async-iterable'

function splitAt (position, iter) {
  const [a0, b0] = asyncTee(ensureAsyncIterable(iter))
  const a1 = asyncSlice(position, a0)
  const b1 = asyncSlice({ start: position }, b0)
  return [a1, b1]
}

export default function curriedSplitAt (position, iter) {
  if (typeof iter === 'undefined') {
    return iter => splitAt(position, iter)
  }

  return splitAt(position, iter)
}
