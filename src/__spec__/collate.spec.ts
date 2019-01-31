import assert from 'static-type-assert'
import * as iter from '../index'

assert<
  IterableIterator<number>
>(iter.collate((a, b) => a - b, [1, 2], [3, 4]))

assert<
  IterableIterator<number>
>(iter.collate(1, [1, 3], [2, 4]))

assert<
  IterableIterator<number>
>(iter.collate([1, 3], [2, 4]))
