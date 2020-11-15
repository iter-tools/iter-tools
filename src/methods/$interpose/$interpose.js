import { $isSync } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $interposeSeq } from '../$interpose-seq/$interpose-seq';

export function $interpose(source, value) {
  return $interposeSeq(source, [value]);
}

export default $iterableCurry($interpose, {
  validateArgs(args) {
    if ($isSync && typeof args[1] === 'string') {
      console.warn(`For string inputs use interposeSeq instead of interpose`);
    }
  },
});
