import assert from 'static-type-assert'
import * as iter from '../index'

assert<
  Iterable<[number, number, number]>
>(iter.permutations(3, [0, 1, 2, 3]))

assert<
  Iterable<number[]>
>(iter.permutations(Number(), [0, 1, 2, 3]))

assert<
  Iterable<number[]>
>(iter.permutations(999, [0, 1, 2, 3]))

assert<
  Iterable<[string, string, string]>
>(iter.permutations(3, ''))

assert<
  Iterable<[number, number, number, number]>
>(iter.permutations([0, 1, 2, 3] as [number, number, number, number]))

assert<
  Iterable<string[]>
>(iter.permutations(''))
