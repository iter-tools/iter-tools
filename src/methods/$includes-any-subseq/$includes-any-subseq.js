import { $iterableCurry } from '../../internal/$iterable';
import { $includes_ } from '../$includes_/$includes_';

const config = { any: true, subseq: true };

export function $includesAnySubseq(iterable, subseqs) {
  return $includes_(iterable, config, subseqs);
}

export default $iterableCurry($includesAnySubseq, {
  reduces: true,
});
