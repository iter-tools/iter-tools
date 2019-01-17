import assert from 'static-type-assert'
import * as iter from '../index'

assert<
  IterableIterator<0 | 1 | 2>
>(iter.cycle([0, 1, 2] as [0, 1, 2]))

assert<
  IterableIterator<never> |
  IterableIterator<0 | 1> |
  IterableIterator<string | number | boolean>
>(iter.cycle([] as [] | [0, 1] | [string, number, boolean]))

assert<
  IterableIterator<string | number | boolean>
>(iter.cycle([] as [] | [0, 1] | [string, number, boolean]))

assert<
  IterableIterator<string>
>(iter.cycle(iter.iterable('')))

assert<
  IterableIterator<0 | 1 | 2>
>(iter.cycle(new Set<0 | 1 | 2>()))
