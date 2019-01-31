const defaultCompare = (a, b) => {
  if (a == null && b == null) return 0
  if (a == null) return 1
  if (b == null) return -1

  return a > b ? 1 : a < b ? -1 : 0
}

export default function pickByComparison (comparator = defaultCompare) {
  return function _mergeByComparison (items) {
    if (items.length === 0) return

    let itemIdx = 0

    for (let i = 1; i < items.length; i++) {
      if (
        items[itemIdx] === undefined ||
        (
          items[i] !== undefined &&
          comparator(items[i].value, items[itemIdx].value) < 0
        )
      ) {
        itemIdx = i
      }
    }

    // if item is undfined here, every item we passed must have been undefined,
    // which would be illegal

    return itemIdx
  }
}
