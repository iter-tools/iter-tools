import compose from './compose'
import zip from './async-zip'
import filter from './async-filter'
import map from './async-map'

export default function asyncCompress (...args) {
  return compose(
    map(entry => entry[0]),
    filter(entry => entry[1]),
    (iterable, compress) => zip(iterable, compress)
  )(...args)
}
