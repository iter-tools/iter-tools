import assert from 'static-type-assert'
import * as iter from '../index'

assert<
  IterableIterator<[string, IterableIterator<string>]>
>(iter.groupBy(null)('AABBBCC'))

assert<
  IterableIterator<[number, IterableIterator<number>]>
>(iter.groupBy(null)([1, 2, 2, 3, 3, 3]))

assert<
  IterableIterator<[string, IterableIterator<string>]>
>(iter.groupBy(null, 'AABBBCC'))

assert<
  IterableIterator<[number, IterableIterator<number>]>
>(iter.groupBy(null, [1, 2, 2, 3, 3, 3]))

assert<
  IterableIterator<[string, IterableIterator<number>]>
>(iter.groupBy(
  (x: number) => String(x)
)([1, 2, 2, 3, 3, 3]))

assert<
  IterableIterator<[string, IterableIterator<number>]>
>(iter.groupBy(
  (x) => String(x),
  [1, 2, 2, 3, 3, 3]
))

assert<
  AsyncIterableIterator<[string, AsyncIterableIterator<string>]>
>(iter.asyncGroupBy(null)('AABBBCC'))

assert<
AsyncIterableIterator<[number, AsyncIterableIterator<number>]>
>(iter.asyncGroupBy(null)([1, 2, 2, 3, 3, 3]))

assert<
  AsyncIterableIterator<[string, AsyncIterableIterator<string>]>
>(iter.asyncGroupBy(null, 'AABBBCC'))

assert<
  AsyncIterableIterator<[number, AsyncIterableIterator<number>]>
>(iter.asyncGroupBy(null, [1, 2, 2, 3, 3, 3]))

assert<
  AsyncIterableIterator<[string, AsyncIterableIterator<number>]>
>(iter.asyncGroupBy(
  (x: number) => String(x)
)([1, 2, 2, 3, 3, 3]))

assert<
AsyncIterableIterator<[string, AsyncIterableIterator<number>]>
>(iter.asyncGroupBy(
  (x) => String(x),
  [1, 2, 2, 3, 3, 3]
))
