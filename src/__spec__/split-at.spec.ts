import assert from 'static-type-assert'
import * as iter from '../index'

assert<[
  IterableIterator<never>,
  IterableIterator<never>
]>(iter.splitAt(0, [] as []))

assert<[
  IterableIterator<never>,
  IterableIterator<never>
]>(iter.splitAt(3, [] as []))

assert<[
  IterableIterator<never>,
  IterableIterator<0 | 1 | 2 | 3 | 4>
]>(iter.splitAt(0, [0, 1, 2, 3, 4] as [0, 1, 2, 3, 4]))

assert<[
  IterableIterator<0 | 1 | 2>,
  IterableIterator<3 | 4>
]>(iter.splitAt(3, [0, 1, 2, 3, 4] as [0, 1, 2, 3, 4]))

assert<[
  IterableIterator<'type'>,
  IterableIterator<'type'>
]>(iter.splitAt(3, [] as 'type'[]))

assert<[
  IterableIterator<'type'>,
  IterableIterator<'type'>
]>(iter.splitAt(3, [] as Iterable<'type'>))

{
  const splitAt3 = iter.splitAt(3)

  assert<[
    IterableIterator<0 | 1 | 2>,
    IterableIterator<3 | 4>
  ]>(splitAt3([0, 1, 2, 3, 4] as [0, 1, 2, 3, 4]))

  assert<[
    IterableIterator<'type'>,
    IterableIterator<'type'>
  ]>(splitAt3([] as 'type'[]))

  assert<[
    IterableIterator<'type'>,
    IterableIterator<'type'>
  ]>(splitAt3([] as Iterable<'type'>))
}

assert<[
  AsyncIterableIterator<never>,
  AsyncIterableIterator<never>
]>(iter.asyncSplitAt(0, [] as []))

assert<[
  AsyncIterableIterator<never>,
  AsyncIterableIterator<never>
]>(iter.asyncSplitAt(3, [] as []))

assert<[
  AsyncIterableIterator<never>,
  AsyncIterableIterator<0 | 1 | 2 | 3 | 4>
]>(iter.asyncSplitAt(0, [0, 1, 2, 3, 4] as [0, 1, 2, 3, 4]))

assert<[
  AsyncIterableIterator<0 | 1 | 2>,
  AsyncIterableIterator<3 | 4>
]>(iter.asyncSplitAt(3, [0, 1, 2, 3, 4] as [0, 1, 2, 3, 4]))

assert<[
  AsyncIterableIterator<'type'>,
  AsyncIterableIterator<'type'>
]>(iter.asyncSplitAt(3, [] as 'type'[]))

assert<[
  AsyncIterableIterator<'type'>,
  AsyncIterableIterator<'type'>
]>(iter.asyncSplitAt(3, [] as Iterable<'type'>))

assert<[
  AsyncIterableIterator<'type'>,
  AsyncIterableIterator<'type'>
]>(iter.asyncSplitAt(3, iter.asyncIterable([] as 'type'[])))

{
  const asyncSplitAt3 = iter.asyncSplitAt(3)

  assert<[
    AsyncIterableIterator<0 | 1 | 2>,
    AsyncIterableIterator<3 | 4>
  ]>(asyncSplitAt3([0, 1, 2, 3, 4] as [0, 1, 2, 3, 4]))

  assert<[
    AsyncIterableIterator<'type'>,
    AsyncIterableIterator<'type'>
  ]>(asyncSplitAt3([] as 'type'[]))

  assert<[
    AsyncIterableIterator<'type'>,
    AsyncIterableIterator<'type'>
  ]>(asyncSplitAt3([] as Iterable<'type'>))

  assert<[
    AsyncIterableIterator<'type'>,
    AsyncIterableIterator<'type'>
  ]>(asyncSplitAt3(iter.asyncIterable([] as 'type'[])))
}
