import assert from 'static-type-assert'
import * as iter from '../index'

assert<
  IterableIterator<0 | 1 | 2>
>(iter.range(3))

assert<
  IterableIterator<number>
>(iter.range(200))

assert<
  IterableIterator<number>
>(iter.range({ start: 2 }))

assert<
  IterableIterator<number>
>(iter.range())
