import { $iterableCurry } from '../../internal/$iterable';
import { $splitOn_ } from '../$split-on_/$split-on_';

const config = { any: true, subseq: true };

export function $splitOnAnySubseq(source, separatorSubseqs) {
  return $splitOn_(source, config, separatorSubseqs);
}

export default $iterableCurry($splitOnAnySubseq);
