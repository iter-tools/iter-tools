import { $iterableCurry } from '../../internal/$iterable.js';
import { $takeLastOr } from '../$take-last-or/$take-last-or.js';

export function $takeLast(iterable) {
  return $takeLastOr(iterable, undefined);
}

export default /*#__PURE__*/ $iterableCurry($takeLast, {
  reduces: true,
});
