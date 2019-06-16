import { $iterableCurry } from './internal/$iterable'
import $splitBy from './internal/$split-by'

function $splitAt (index, iterable) {
  return $splitBy((item, i) => i >= index, iterable)
}

export default $iterableCurry($splitAt, { forceSync: true })
