import { $iterableCurry } from '../../internal/$iterable';
import { $findOr } from '../$find-or/$find-or';

export function $find(iterable, predicate) {
  return $findOr(iterable, undefined, predicate);
}

export default $iterableCurry($find, {
  reduces: true,
});
