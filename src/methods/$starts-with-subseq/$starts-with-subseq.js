import { $iterableCurry } from '../../internal/$iterable';
import $internalStartsWith from '../$starts-with_/$starts-with';

const config = { any: false, subseq: true };

export function $startsWithSubseq(iterable, value) {
  return $internalStartsWith(iterable, config, value);
}

export default $iterableCurry($startsWithSubseq, {
  reduces: true,
});
