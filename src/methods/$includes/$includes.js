import { $isSync } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $includesAny } from '../$includes-any/$includes-any';

export function $includes(iterable, value) {
  return $includesAny(iterable, [value]);
}

export default $iterableCurry($includes, {
  reduces: true,
  validateArgs(args) {
    if ($isSync && typeof args[1] === 'string') {
      console.warn(`For string inputs use includesSeq instead of includes`);
    }
  },
});
