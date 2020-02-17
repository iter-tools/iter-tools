import { $iterableCurry } from '../../internal/$iterable';
import { $takeSorted } from '../$take-sorted/$take-sorted';

export function $sort(source) {
  return $takeSorted(source, Infinity);
}

export default $iterableCurry($sort);
