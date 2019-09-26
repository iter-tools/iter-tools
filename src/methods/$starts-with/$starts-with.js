import { $iterableCurry } from '../../internal/$iterable';
import { $startsWith_ } from '../$starts-with_/$starts-with_';

const config = { any: false, subseq: false };

export function $startsWith(iterable, value) {
  return $startsWith_(iterable, config, value);
}

export default $iterableCurry($startsWith, {
  reduces: true,
});
