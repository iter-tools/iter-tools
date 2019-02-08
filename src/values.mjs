const emptyArr = []

export default function * values (valuesable) {
  if (valuesable == null) {
    return emptyArr[Symbol.iterator]()
  } else if (typeof valuesable.values === 'function') {
    yield * valuesable.values()
  } else if (typeof valuesable === 'object') { // pojo
    for (let key in valuesable) {
      if (valuesable.hasOwnProperty(key)) {
        yield valuesable[key]
      }
    }
  }
}
