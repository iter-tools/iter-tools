import range from '../range/range';
import zip from '../$zip/$zip';

export default function $enumerate(iterable, start = 0) {
  return zip(range({ start }), iterable);
}
