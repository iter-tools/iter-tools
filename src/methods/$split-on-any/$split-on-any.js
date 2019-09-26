import { $iterableCurry } from '../../internal/$iterable';
import { $splitOn_ } from '../$split-on_/$split-on_';

const config = { any: true, subseq: false };

function $splitOnAny(iterable, values) {
  return $splitOn_(iterable, config, values);
}

export default $iterableCurry($splitOnAny);
