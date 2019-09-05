import { $iterableCurry } from '../../internal/$iterable';
import $internalStartsWith from '../$starts-with_/$starts-with';

const config = { any: false, subseq: false };

export function $startsWith(iterable, value) {
  return $internalStartsWith(iterable, config, value);
}

export default $iterableCurry($startsWith, {
  reduces: true,
});
