import { $iterableCurry } from '../../internal/$iterable';
import $internalIncludes from '../$includes_/$includes';

const config = { any: false, subseq: false };

export function $includes(iterable, value) {
  return $internalIncludes(iterable, config, value);
}

export default $iterableCurry($includes, {
  reduces: true,
});
