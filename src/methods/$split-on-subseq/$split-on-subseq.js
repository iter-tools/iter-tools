import { $iterableCurry } from '../../internal/$iterable';
import { $splitOn_ } from '../$split-on_/$split-on_';

const config = { any: false, subseq: true };

export function $splitOnSubseq(source, subseq) {
  return $splitOn_(source, config, subseq);
}

export default $iterableCurry($splitOnSubseq);
