import { $firstOr } from '../$first-or/$first-or';

export function $first(iterable) {
  return $firstOr(iterable, undefined);
}

export default $first;
