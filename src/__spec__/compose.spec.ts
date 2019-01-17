import assert from 'static-type-assert'
import { compose, map, filter } from '../index'

const func = compose<Iterable<number>>(
  filter(x => {
    assert<number>(x)
    return x % 2 === 1
  }),
  map(x => {
    assert<number>(x)
    return x + 2
  })
)

assert<
  (iter: Iterable<number>) => Iterable<number>
>(func)

assert<
  Iterable<number>
>(func([0, 1, 2, 3]))
