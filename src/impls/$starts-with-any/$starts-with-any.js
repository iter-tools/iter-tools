import { $isSync, $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $firstOr } from '../$first-or/$first-or.js';

const none = Symbol('none');

$async;
export function $startsWithAny(iterable, values) {
  return values.includes($await($firstOr(iterable, none)));
}

export default /*#__PURE__*/ $iterableCurry($startsWithAny, {
  reduces: true,
  validateArgs(args) {
    if ($isSync && typeof args[1] === 'string') {
      console.warn('For string inputs use startsWithAnySeq instead of startsWithAny');
    }
  },
});
