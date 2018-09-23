import assert from 'static-type-assert'
import * as iter from '../index'

assert<
  IterableIterator<[0 | 1 | 2, 3 | 4 | 5]>
>(iter.product(
  [0, 1, 2] as [0, 1, 2],
  [3, 4, 5] as [3, 4, 5]
))

assert<
  IterableIterator<[number, number, number]>
>(iter.product([0, 1, 2], [3, 4, 5], [7, 8, 9]))

assert<
  IterableIterator<[string, string, string]>
>(iter.product(
  iter.iterable(''),
  iter.iterable(''),
  iter.iterable('')
))
