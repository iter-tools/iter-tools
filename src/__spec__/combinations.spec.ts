import assert from 'static-type-assert'
import * as iter from '../index'

assert<
  Iterable<[number, number, number]>
>(iter.combinations([0, 1, 2, 3], 3))

assert<
  number
>(iter.combinations([0, 1, 2, 3], 3).getSize())

assert<
  Iterable<number[]>
>(iter.combinations([0, 1, 2, 3], Number()))

assert<
  Iterable<number[]>
>(iter.combinations([0, 1, 2, 3], 999))

assert<
  Iterable<[string, string, string]>
>(iter.combinations(iter.iterable(''), 3))

assert<
  Iterable<[number, number, number, number]>
>(iter.combinations([0, 1, 2, 3] as [number, number, number, number]))

assert<
  Iterable<string[]>
>(iter.combinations(iter.iterable('')))
