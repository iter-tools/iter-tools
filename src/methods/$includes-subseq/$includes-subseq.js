import { $iterableCurry } from '../../internal/$iterable';
import { $includes_ } from '../$includes_/$includes_';

const config = { any: false, subseq: true };

export function $includesSubseq(iterable, value) {
  return $includes_(iterable, config, value);
}

export default $iterableCurry($includesSubseq, {
  reduces: true,
});
