import takeSorted from './internal/async-take-sorted'

function compareByKeyDescending (a, b) {
  if (a.key > b.key) {
    return 1
  } else if (a.key < b.key) {
    return -1
  } else {
    return 0
  }
}

export default function curriedNLargest (number, expr, iterable) {
  if (arguments.length === 3) {
    return takeSorted(number, expr, compareByKeyDescending, iterable)
  } else if (arguments.length === 2) {
    if (Symbol.iterator in expr) {
      iterable = expr
      expr = undefined
      return takeSorted(number, expr, compareByKeyDescending, iterable)
    } else {
      return iterable => takeSorted(number, expr, compareByKeyDescending, iterable)
    }
  } else {
    return iterable => takeSorted(number, expr, compareByKeyDescending, iterable)
  }
}
