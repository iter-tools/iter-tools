import { $isSync, $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $findOr } from '../$find-or/$find-or';

const none = Symbol('none');

$async;
export function $includesAny(iterable, values) {
  return $await($findOr(iterable, none, (value) => values.includes(value))) !== none;
}

export default $iterableCurry($includesAny, {
  reduces: true,
  validateArgs(args) {
    if ($isSync && typeof args[1] === 'string') {
      console.warn(`For string inputs use includesAnySeq instead of includesAny`);
    }
  },
});
