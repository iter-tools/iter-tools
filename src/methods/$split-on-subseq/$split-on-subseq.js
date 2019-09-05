import { $iterableCurry } from '../../internal/$iterable';
import $internalSplitOn from '../$split-on_/$split-on';

const config = { any: false, subseq: true };

function $splitOnSubseq(iterable, subseq) {
  return $internalSplitOn(iterable, config, subseq);
}

export default $iterableCurry($splitOnSubseq);
