const identity = (x) => x;

export function pipe(...fns) {
  if (!fns.length) fns = [identity];
  return fns.reduce((f, g) => (...args) => g(f(...args)));
}
