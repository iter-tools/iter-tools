import { curry } from './internal/curry'

const emptyArray = []

function apply (fn, args = emptyArray) {
  return fn(...args)
}

export default curry(apply, 2)
