import { $iterableCurry } from '../../internal/$iterable';
import { $findOr } from '../$find-or/$find-or';

export function $find(iterable, func) {
  return $findOr(iterable, undefined, func);
}

export default $iterableCurry($find, {
  reduces: true,
});
