import { $lastOr } from '../$last-or/$last-or';

export function $last(iterable) {
  return $lastOr(iterable, undefined);
}

export default $last;
