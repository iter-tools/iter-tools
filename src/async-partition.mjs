import Dequeue from 'dequeue'
import ensureAsyncIterable from './internal/ensure-async-iterable'
import asyncPartitionPart from './internal/async-partition-part'

function partition (func, iter) {
  const satisfied = new Dequeue()
  const unsatisfied = new Dequeue()
  const iterator = ensureAsyncIterable(iter)[Symbol.asyncIterator]()

  const part = queue => asyncPartitionPart(
    iterator,
    queue,
    async value => (await func(value)) ? satisfied : unsatisfied,
    () => 2
  )

  return [part(satisfied), part(unsatisfied)]
}

export default function curriedPartition (func, iter) {
  if (typeof iter === 'undefined') {
    return iter => partition(func, iter)
  }
  return partition(func, iter)
}
