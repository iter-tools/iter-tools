import assert from 'static-type-assert'
import * as iter from '../index'

assert<
  IterableIterator<IterableIterator<number>>
>(iter.multiPartition(
  x => {
    assert<number>(x)
    return x % 3
  },
  [0, 1, 2, 3]
))

assert<
  IterableIterator<IterableIterator<number>>
>(iter.multiPartition((x: number) => x % 3)([0, 1, 2, 3]))
