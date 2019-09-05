import { $iterableCurry } from '../../internal/$iterable';
import $internalStartsWith from '../$starts-with_/$starts-with';

const config = { any: true, subseq: false };

export function $startsWithAny(iterable, value) {
  return $internalStartsWith(iterable, config, value);
}

export default $iterableCurry($startsWithAny, {
  reduces: true,
});
