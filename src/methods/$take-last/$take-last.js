import { $iterableCurry } from '../../internal/$iterable';
import { $takeLastOr } from '../$take-last-or/$take-last-or';

export function $takeLast(iterable) {
  return $takeLastOr(iterable, undefined);
}

export default $iterableCurry($takeLast, {
  reduces: true,
});
