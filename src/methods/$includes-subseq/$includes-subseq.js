import { $iterableCurry } from '../../internal/$iterable';
import $internalIncludes from '../$includes_/$includes';

const config = { any: false, subseq: true };

export function $includesSubseq(iterable, value) {
  return $internalIncludes(iterable, config, value);
}

export default $iterableCurry($includesSubseq, {
  reduces: true,
});
