import { $lastOr } from '../$last-or/$last-or';

import { $iterableCurry } from '../../internal/$iterable';

export function $last(iterable) {
  return $lastOr(iterable, undefined);
}

export default $iterableCurry($last, {
  reduces: true,
});
