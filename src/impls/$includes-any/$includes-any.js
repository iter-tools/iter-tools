import { $isSync, $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $findOr } from '../$find-or/$find-or.js';

const none = Symbol('none');

$async;
export function $includesAny(iterable, values) {
  return $await($findOr(iterable, none, (value) => values.includes(value))) !== none;
}

export default /*#__PURE__*/ $iterableCurry($includesAny, {
  reduces: true,
  validateArgs(args) {
    if ($isSync && typeof args[1] === 'string') {
      console.warn(`For string inputs use includesAnySeq instead of includesAny`);
    }
  },
});
