import { $iterableCurry } from '../../internal/$iterable';
import $internalIncludes from '../$includes_/$includes';

const config = { any: true, subseq: true };

export function $includesAnySubseq(iterable, value) {
  return $internalIncludes(iterable, config, value);
}

export default $iterableCurry($includesAnySubseq, {
  reduces: true,
});
