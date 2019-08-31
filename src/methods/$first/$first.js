import { $firstOr } from '../$first-or/$first-or';

export function $first(iterable) {
  return $firstOr(undefined, iterable);
}

export default $first;
