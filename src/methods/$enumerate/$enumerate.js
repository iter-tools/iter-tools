import range from '../range/range';
import $zip from '../$zip/$zip';

export function $enumerate(iterable, start = 0) {
  return $zip(range(start, Infinity, 1), iterable);
}

export default $enumerate;
