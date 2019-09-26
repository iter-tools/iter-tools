import { $iterableCurry } from '../../internal/$iterable';
import { $splitOn_ } from '../$split-on_/$split-on_';

const config = { any: false, subseq: false };

function $splitOn(iterable, value) {
  return $splitOn_(iterable, config, value);
}

export default $iterableCurry($splitOn);
