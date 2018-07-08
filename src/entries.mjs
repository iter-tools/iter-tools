const emptyArr = []

export default function * entries (entriesable) {
  if (entriesable == null) {
    return emptyArr[Symbol.iterator]()
  } else if (typeof entriesable.entries === 'function') {
    yield * entriesable.entries()
  } else if (typeof entriesable === 'object') { // pojo
    for (let key in entriesable) {
      if (entriesable.hasOwnProperty(key)) {
        yield [key, entriesable[key]]
      }
    }
  }
}
