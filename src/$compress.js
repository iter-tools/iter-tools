import compose from './compose'
import $zip from './$zip'
import $filter from './$filter'
import $map from './$map'

export default function $compress (...args) {
  return compose(
    $map(entry => entry[0]),
    $filter(entry => entry[1]),
    (iterable, compress) => $zip(iterable, compress)
  )(...args)
}
