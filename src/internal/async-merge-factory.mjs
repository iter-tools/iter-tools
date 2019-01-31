export default function ayncMergeFactory (asyncZipEntries) {
  return async function * merge (mergeFunc, iterables) {
    const values = new Array(iterables.length)

    for await (const items of asyncZipEntries(iterables)) {
      for (let i = 0; i < items.length; i++) {
        values[i] = items[i].done ? undefined : items[i].value
      }

      yield mergeFunc(...values)
    }
  }
}
