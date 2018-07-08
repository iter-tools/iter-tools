import zip from './zip'

const emptyArr = []

export default function * entries (entriesable) {
  if (entriesable == null) {
    return emptyArr[Symbol.iterator]()
  } else if (typeof entriesable.entries === 'function') {
    if (
      typeof entriesable.keys === 'function' &&
      typeof entriesable.values === 'function'
    ) {
      yield * zip([
        {[Symbol.iterator]: () => entriesable.keys()},
        {[Symbol.iterator]: () => entriesable.values()}
      ])
    } else {
      yield * entriesable.entries()
    }
  } else if (typeof entriesable === 'object') { // pojo
    for (let key in entriesable) {
      if (entriesable.hasOwnProperty(key)) {
        yield [key, entriesable[key]]
      }
    }
  }
}
