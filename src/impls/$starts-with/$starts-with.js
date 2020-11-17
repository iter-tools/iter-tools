import { $isSync } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $startsWithAny } from '../$starts-with-any/$starts-with-any.js';

export function $startsWith(iterable, values) {
  return $startsWithAny(iterable, [values]);
}

export default /*#__PURE__*/ $iterableCurry($startsWith, {
  reduces: true,
  validateArgs(args) {
    if ($isSync && typeof args[1] === 'string') {
      console.warn('For string inputs use startsWithSeq instead of startsWith');
    }
  },
});
