import { $iterableCurry } from '../../internal/$iterable';
import { $includes_ } from '../$includes_/$includes_';

const config = { any: true, subseq: false };

export function $includesAny(iterable, values) {
  return $includes_(iterable, config, values);
}

export default $iterableCurry($includesAny, {
  reduces: true,
});
