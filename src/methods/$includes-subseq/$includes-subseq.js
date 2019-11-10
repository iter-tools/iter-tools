import { $iterableCurry } from '../../internal/$iterable';
import { $includes_ } from '../$includes_/$includes_';

const config = { any: false, subseq: true };

export function $includesSubseq(iterable, subseq) {
  return $includes_(iterable, config, subseq);
}

export default $iterableCurry($includesSubseq, {
  reduces: true,
});
