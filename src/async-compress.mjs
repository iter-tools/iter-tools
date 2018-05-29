import zip from './async-zip'
import filter from './async-filter'
import map from './async-map'

export default function compress (iterable, compress) {
  const _map = map(function (couple) { return couple[0] })
  const _filter = filter(function (couple) {
    return couple[1]
  })
  return _map(_filter(zip(iterable, compress)))
}
