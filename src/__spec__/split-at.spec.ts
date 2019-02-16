import assert from 'static-type-assert'
import * as iter from '../index'

assert<
  IterableIterator<IterableIterator<number>>
>(iter.splitAt(3, [0, 1, 2, 3]))

assert<
  IterableIterator<IterableIterator<number>>
>(iter.splitAt(3)([0, 1, 2, 3]))

assert<
  IterableIterator<AsyncIterableIterator<number>>
>(iter.asyncSplitAt(3, [0, 1, 2, 3]))

assert<
  IterableIterator<AsyncIterableIterator<number>>
>(iter.asyncSplitAt(3)([0, 1, 2, 3]))
