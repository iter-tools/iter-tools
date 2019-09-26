import { $iterableCurry } from '../../internal/$iterable';
import { $includes_ } from '../$includes_/$includes_';

const config = { any: true, subseq: false };

export function $includesAny(iterable, value) {
  return $includes_(iterable, config, value);
}

export default $iterableCurry($includesAny, {
  reduces: true,
});
