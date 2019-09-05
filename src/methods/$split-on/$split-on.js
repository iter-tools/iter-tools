import { $iterableCurry } from '../../internal/$iterable';
import $internalSplitOn from '../$split-on_/$split-on';

const config = { any: false, subseq: false };

function $splitOn(iterable, value) {
  return $internalSplitOn(iterable, config, value);
}

export default $iterableCurry($splitOn);
