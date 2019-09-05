import { $iterableCurry } from '../../internal/$iterable';
import $internalSplitOn from '../$split-on_/$split-on';

const config = { any: true, subseq: false };

function $splitOnAny(iterable, values) {
  return $internalSplitOn(iterable, config, values);
}

export default $iterableCurry($splitOnAny);
