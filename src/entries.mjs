import zip from './zip'

const emptyArr = []

export default function * entries (entriesable, reuseEntry = false) {
  if (entriesable == null) {
    return emptyArr[Symbol.iterator]()
  } else if (typeof entriesable.entries === 'function') {
    if (
      reuseEntry &&
      typeof entriesable.keys === 'function' &&
      typeof entriesable.values === 'function'
    ) {
      yield * zip([
        {[Symbol.iterator]: () => entriesable.keys()},
        {[Symbol.iterator]: () => entriesable.values()}
      ], reuseEntry)
    } else {
      yield * entriesable.entries()
    }
  } else if (typeof entriesable === 'object') { // pojo
    for (let key in entriesable) {
      const entry = []
      if (entriesable.hasOwnProperty(key)) {
        if (reuseEntry) {
          entry[0] = key
          entry[1] = entriesable[key]
          yield entry
        } else {
          yield [key, entriesable[key]]
        }
      }
    }
  }
}
