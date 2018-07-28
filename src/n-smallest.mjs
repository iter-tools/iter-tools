import takeSorted from './internal/take-sorted'

function compareByKeyAscending (a, b) {
  if (a.key < b.key) {
    return 1
  } else if (a.key > b.key) {
    return -1
  } else {
    return 0
  }
}

export default function curriedNSmallest (number, expr, iterable) {
  if (arguments.length === 3) {
    return takeSorted(number, expr, compareByKeyAscending, iterable)
  } else if (arguments.length === 2) {
    if (Symbol.iterator in expr) {
      iterable = expr
      expr = undefined
      return takeSorted(number, expr, compareByKeyAscending, iterable)
    } else {
      return iterable => takeSorted(number, expr, compareByKeyAscending, iterable)
    }
  } else {
    return iterable => takeSorted(number, expr, compareByKeyAscending, iterable)
  }
}
