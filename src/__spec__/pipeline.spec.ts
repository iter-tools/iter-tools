import assert from 'static-type-assert'
import { pipeline, range, map, filter } from '../index'

{ // using function
  const func = pipeline(
    () => range(12) as Iterable<number>,
    filter(x => {
      assert<number>(x)
      return x % 2 === 1
    }),
    map(x => {
      assert<number>(x)
      return x + 2
    })
  )

  assert<() => Iterable<number>>(func)
  assert<Iterable<number>>(func())
}

{ // using composition
  const func = pipeline(
    filter((x: number) => x % 2 === 1),
    map(x => {
      assert<number>(x)
      return x + 2
    })
  )

  assert<(iter: Iterable<number>) => Iterable<number>>(func)
  assert<Iterable<number>>(func([0, 1, 2, 3]))
}
