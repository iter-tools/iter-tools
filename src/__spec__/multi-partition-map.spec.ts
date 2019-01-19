import assert from 'static-type-assert'
import * as iter from '../index'

const key = 'key'
const map = iter.multiPartitionMap(
  x => {
    assert<number>(x)
    return key as typeof key
  },
  [0, 1, 2, 3]
)

assert<
  IterableIterator<number>
>(map.get(key))
