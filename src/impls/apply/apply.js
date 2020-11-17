import { curry } from '../../internal/curry.js';

export function apply(fn, args = []) {
  return fn(...(args === null ? [] : args));
}

export default /*#__PURE__*/ curry(apply, 2);
