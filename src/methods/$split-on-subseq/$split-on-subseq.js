import { $iterableCurry } from '../../internal/$iterable';
import { $splitOn_ } from '../$split-on_/$split-on_';

const config = { any: false, subseq: true };

function $splitOnSubseq(iterable, subseq) {
  return $splitOn_(iterable, config, subseq);
}

export default $iterableCurry($splitOnSubseq);
