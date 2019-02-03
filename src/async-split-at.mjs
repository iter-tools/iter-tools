import asyncTee from './async-tee'
import asyncSlice from './async-slice'
import curry from './internal/curry'

function asyncSplitAt (position, iter) {
  const [first, second] = asyncTee(iter)

  return [
    asyncSlice({ end: position }, first),
    asyncSlice({ start: position }, second)
  ]
}

export default curry(asyncSplitAt)
