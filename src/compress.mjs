import zip from './zip'
import filter from './filter'
import map from './map'

export default function compress (iterable, compress) {
  const _map = map(couple => couple[0])
  const _filter = filter(couple => couple[1])
  return _map(_filter(zip(iterable, compress)))
}
