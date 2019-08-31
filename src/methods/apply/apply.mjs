import { curry } from '../../internal/curry';

export function apply(fn, args = []) {
  return fn(...(args === null ? [] : args));
}

export default curry(apply, 2);
