import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $firstOr } from '../$first-or/$first-or';

const none = Symbol('none');

$async;
export function $isEmpty(iterable) {
  return $await($firstOr(iterable, none)) === none;
}

export default $iterableCurry($isEmpty, {
  reduces: true,
});
