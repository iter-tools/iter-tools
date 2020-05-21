import { $firstOr } from '../$first-or/$first-or';

import { $iterableCurry } from '../../internal/$iterable';

export function $first(iterable) {
  return $firstOr(iterable, undefined);
}

export default $iterableCurry($first, {
  reduces: true,
});
