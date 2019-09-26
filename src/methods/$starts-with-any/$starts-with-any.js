import { $iterableCurry } from '../../internal/$iterable';
import { $startsWith_ } from '../$starts-with_/$starts-with_';

const config = { any: true, subseq: false };

export function $startsWithAny(iterable, value) {
  return $startsWith_(iterable, config, value);
}

export default $iterableCurry($startsWithAny, {
  reduces: true,
});
