import { $isSync } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $splitWith } from '../$split-with/$split-with';

export function $splitOnAny(source, separators) {
  return $splitWith(source, (value) => separators.includes(value));
}

export default $iterableCurry($splitOnAny, {
  validateArgs(args) {
    if ($isSync && typeof args[1] === 'string') {
      console.warn(`For string inputs use splitOnAnySeq instead of splitOnAny`);
    }
  },
});
