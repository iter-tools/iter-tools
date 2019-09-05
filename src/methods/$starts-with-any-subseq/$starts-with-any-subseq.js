import { $iterableCurry } from '../../internal/$iterable';
import $internalStartsWith from '../$starts-with_/$starts-with';

const config = { any: true, subseq: true };

export function $startsWithAnySubseq(iterable, value) {
  return $internalStartsWith(iterable, config, value);
}

export default $iterableCurry($startsWithAnySubseq, {
  reduces: true,
});
