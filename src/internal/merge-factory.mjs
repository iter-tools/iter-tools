export default function mergeFactory (zipEntries) {
  return function * merge (mergeFunc, iterables) {
    const values = new Array(iterables.length)

    for (const items of zipEntries(iterables)) {
      for (let i = 0; i < items.length; i++) {
        values[i] = items[i].done ? undefined : items[i].value
      }

      yield mergeFunc(...values)
    }
  }
}
