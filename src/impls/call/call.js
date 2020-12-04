export function __call(fn, ...args) {
  return fn(...args);
}

export const call = __call;
