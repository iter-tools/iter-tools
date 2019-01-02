import assert from 'static-type-assert'
import * as iter from '../index'

const sampleIterable = [0, 1, 2, 'a', 'b', 'c']

assert<
  IterableIterator<string>
>(
  iter.filter(
    (item): item is string => typeof item === 'string',
    sampleIterable
  )
)

assert<
  IterableIterator<number>
>(
  iter.filter(
    (item): item is number => typeof item === 'number',
    sampleIterable
  )
)

assert<
  IterableIterator<0>
>(
  iter.filter(
    (item): item is 0 => item === 0,
    sampleIterable
  )
)

assert<
  AsyncIterableIterator<string>
>(
  iter.asyncFilter(
    (item): item is string => typeof item === 'string',
    sampleIterable
  )
)
