import { $iterableCurry } from '../../internal/$iterable';
import { $startsWith_ } from '../$starts-with_/$starts-with_';

const config = { any: false, subseq: true };

export function $startsWithSubseq(iterable, valueSubseq) {
  return $startsWith_(iterable, config, valueSubseq);
}

export default $iterableCurry($startsWithSubseq, {
  reduces: true,
});
