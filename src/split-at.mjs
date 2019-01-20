import slice from './slice'
import tee from './tee'
import ensureIterable from './internal/ensure-iterable'

function splitAt (position, iter) {
  const [a0, b0] = tee(ensureIterable(iter))
  const a1 = slice(position, a0)
  const b1 = slice({ start: position }, b0)
  return [a1, b1]
}

export default function curriedSplitAt (position, iter) {
  if (typeof iter === 'undefined') {
    return iter => splitAt(position, iter)
  }

  return splitAt(position, iter)
}
