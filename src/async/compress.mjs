import zip from './zip'
import filter from './filter'
import map from './map'

export default function compress (iterable, compress) {
  const _map = map(function (couple) { return couple[0] })
  const _filter = filter(function (couple) {
    return couple[1]
  })
  return _map(_filter(zip(iterable, compress)))
}
