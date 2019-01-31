export default function pickByPosition (step = 1) {
  let current = -step
  return function _mergeByPosition (items) {
    current = (current + step) % items.length
    while (items[current] === null) {
      current = (current + 1) % items.length
    }
    return current
  }
}
