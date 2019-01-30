import assert from 'static-type-assert'
import * as iter from '../index'

assert<
  IterableIterator<number>
>(iter.mapFunc([(x) => x, (x) => x], [1, 2, 3]))
