import { $iterableCurry } from '../../internal/$iterable';
import { $includes_ } from '../$includes_/$includes_';

const config = { any: false, subseq: false };

export function $includes(iterable, value) {
  return $includes_(iterable, config, value);
}

export default $iterableCurry($includes, {
  reduces: true,
});
