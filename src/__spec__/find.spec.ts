import assert from 'static-type-assert'
import * as iter from '../index'

const sampleIterable = [0, 1, 2, 3]

assert<2 | undefined>(
  iter.find(
    (item): item is 2 => item === 2,
    sampleIterable
  )
)

assert<
  Promise<2 | undefined>
>(
  iter.asyncFind(
    (item): item is 2 => item === 2,
    sampleIterable
  )
)
