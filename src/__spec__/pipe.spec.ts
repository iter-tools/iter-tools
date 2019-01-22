import assert from 'static-type-assert'
import { pipe, range, map, filter, permutations } from '../index'

assert<
  IterableIterator<number>
>(pipe(
  range(10),
  filter(x => {
    assert<number>(x)
    return x % 2 === 1
  }),
  map(x => {
    assert<number>(x)
    return x + 2
  })
))

assert<
  IterableIterator<0 | 1 | 2 | 3>
>(pipe(
  range(10),
  filter(x => {
    assert<number>(x)
    return x % 2 === 1
  }),
  map(x => {
    assert<number>(x)
    return x + 2
  }),
  filter((x): x is 0 | 1 | 2 | 3 => {
    assert<number>(x)
    return x < 5
  })
))

assert<4>(pipe(
  0 as 0,
  x => {
    assert<0>(x)
    return 1 as 1
  },
  x => {
    assert<1>(x)
    return 2 as 2
  },
  x => {
    assert<2>(x)
    return 3 as 3
  },
  x => {
    assert<3>(x)
    return 4 as 4
  }
))
