import assert from 'static-type-assert'
import * as iter from '../index'

assert<[
  Iterable<number>,
  Iterable<string | boolean>
]>(iter.partition(
  (item): item is number => {
    assert<string | number | boolean>(item)
    return typeof item === 'number'
  },
  ['a', 0, true]
))

assert<
  (iter: Iterable<string | number | boolean>) => [
    Iterable<number>,
    Iterable<string | boolean>
  ]
>(iter.partition(
  (item: string | number | boolean): item is number =>
    typeof item === 'number'
))

assert<[
  Iterable<number>,
  Iterable<number>
]>(iter.partition(
  item => {
    assert<number>(item)
    return item % 2 === 0
  },
  iter.range(10)
))

assert<
  (iter: Iterable<number>) => [
    Iterable<number>,
    Iterable<number>
  ]
>(iter.partition(
  (item: number) => item % 2 === 0
))
