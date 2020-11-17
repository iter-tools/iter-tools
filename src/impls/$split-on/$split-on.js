import { $isSync } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $splitWith } from '../$split-with/$split-with.js';

export function $splitOn(source, separator) {
  return $splitWith(source, (value) => value === separator);
}

export default /*#__PURE__*/ $iterableCurry($splitOn, {
  validateArgs(args) {
    if ($isSync && typeof args[1] === 'string') {
      console.warn(`For string inputs use splitOnSeq instead of splitOn`);
    }
  },
});
