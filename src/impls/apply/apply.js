import { curry } from '../../internal/curry.js';

export function __apply(fn, args = []) {
  return fn(...(args === null ? [] : args));
}

export const apply = /*#__PURE__*/ curry(__apply, 2);
