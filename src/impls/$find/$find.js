import { $iterableCurry } from '../../internal/$iterable.js';
import { $findOr } from '../$find-or/$find-or.js';

export function $find(iterable, predicate) {
  return $findOr(iterable, undefined, predicate);
}

export default /*#__PURE__*/ $iterableCurry($find, {
  reduces: true,
});
