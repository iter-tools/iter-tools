import assert from 'static-type-assert'
import { pipeline, range, map, filter } from '../index'

assert<
  IterableIterator<number>
>(pipeline(
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
