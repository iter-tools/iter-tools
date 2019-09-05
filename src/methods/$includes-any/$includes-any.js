import { $iterableCurry } from '../../internal/$iterable';
import $internalIncludes from '../$includes_/$includes';

const config = { any: true, subseq: false };

export function $includesAny(iterable, value) {
  return $internalIncludes(iterable, config, value);
}

export default $iterableCurry($includesAny, {
  reduces: true,
});
