import { $firstOr } from '../$first-or/$first-or.js';

import { $iterableCurry } from '../../internal/$iterable.js';

export function $first(iterable) {
  return $firstOr(iterable, undefined);
}

export default /*#__PURE__*/ $iterableCurry($first, {
  reduces: true,
});
