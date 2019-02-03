import fork from './fork'
import slice from './slice'
import curry from './internal/curry'

function splitAt (position, iter) {
  const [first, second] = fork(iter)

  return [
    slice({ end: position }, first),
    slice({ start: position }, second)
  ]
}

export default curry(splitAt)
