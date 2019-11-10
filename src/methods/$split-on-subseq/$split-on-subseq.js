import { $iterableCurry } from '../../internal/$iterable';
import { $splitOn_ } from '../$split-on_/$split-on_';

const config = { any: false, subseq: true };

export function $splitOnSubseq(source, separatorSubseq) {
  return $splitOn_(source, config, separatorSubseq);
}

export default $iterableCurry($splitOnSubseq);
