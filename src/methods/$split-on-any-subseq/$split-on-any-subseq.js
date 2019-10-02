import { $iterableCurry } from '../../internal/$iterable';
import { $splitOn_ } from '../$split-on_/$split-on_';

const config = { any: true, subseq: true };

function $splitOnAnySubseq(source, subseqs) {
  return $splitOn_(source, config, subseqs);
}

export default $iterableCurry($splitOnAnySubseq);
