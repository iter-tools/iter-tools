import assert from 'static-type-assert'
import { pipe, range, map, filter } from '../index'

assert<
  IterableIterator<number>
>(pipe(
  range(),
  filter(x => {
    assert<number>(x)
    return x % 2 === 1
  }),
  map(x => {
    assert<number>(x)
    return x + 2
  })
))
