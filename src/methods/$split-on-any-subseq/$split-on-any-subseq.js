import { $iterableCurry } from '../../internal/$iterable';
import { $splitOn_ } from '../$split-on_/$split-on_';

const config = { any: true, subseq: true };

function $splitOnAnySubseq(iterable, subseqs) {
  return $splitOn_(iterable, config, subseqs);
}

export default $iterableCurry($splitOnAnySubseq);
