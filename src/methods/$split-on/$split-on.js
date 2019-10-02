import { $iterableCurry } from '../../internal/$iterable';
import { $splitOn_ } from '../$split-on_/$split-on_';

const config = { any: false, subseq: false };

function $splitOn(source, value) {
  return $splitOn_(source, config, value);
}

export default $iterableCurry($splitOn);
