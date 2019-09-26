import { $iterableCurry } from '../../internal/$iterable';
import { $startsWith_ } from '../$starts-with_/$starts-with_';

const config = { any: true, subseq: true };

export function $startsWithAnySubseq(iterable, value) {
  return $startsWith_(iterable, config, value);
}

export default $iterableCurry($startsWithAnySubseq, {
  reduces: true,
});
