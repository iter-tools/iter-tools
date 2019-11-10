import { $iterableCurry } from '../../internal/$iterable';
import { $splitOn_ } from '../$split-on_/$split-on_';

const config = { any: true, subseq: false };

export function $splitOnAny(source, separatorValues) {
  return $splitOn_(source, config, separatorValues);
}

export default $iterableCurry($splitOnAny);
