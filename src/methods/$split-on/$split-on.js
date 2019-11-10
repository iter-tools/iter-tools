import { $iterableCurry } from '../../internal/$iterable';
import { $splitOn_ } from '../$split-on_/$split-on_';

const config = { any: false, subseq: false };

export function $splitOn(source, separatorValue) {
  return $splitOn_(source, config, separatorValue);
}

export default $iterableCurry($splitOn);
