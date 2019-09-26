import { $iterableCurry } from '../../internal/$iterable';
import { $includes_ } from '../$includes_/$includes_';

const config = { any: true, subseq: true };

export function $includesAnySubseq(iterable, value) {
  return $includes_(iterable, config, value);
}

export default $iterableCurry($includesAnySubseq, {
  reduces: true,
});
