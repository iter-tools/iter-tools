import { $iterableCurry } from '../../internal/$iterable';
import { $startsWith_ } from '../$starts-with_/$starts-with_';

const config = { any: true, subseq: true };

export function $startsWithAnySubseq(iterable, valueSubseqs) {
  return $startsWith_(iterable, config, valueSubseqs);
}

export default $iterableCurry($startsWithAnySubseq, {
  reduces: true,
});
