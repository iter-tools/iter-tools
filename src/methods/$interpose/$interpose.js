import { $isSync } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $interposeSubseq } from '../$interpose-subseq/$interpose-subseq';

export function $interpose(source, value) {
  return $interposeSubseq(source, [value]);
}

export default $iterableCurry($interpose, {
  validateArgs(args) {
    if ($isSync && typeof args[1] === 'string') {
      console.warn(`For string inputs use interposeSubseq instead of interpose`);
    }
  },
});
