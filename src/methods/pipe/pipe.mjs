const identity = x => x;

export default function pipe(...fns) {
  if (!fns.length) fns = [identity];
  return fns.reduce((f, g) => (...args) => g(f(...args)));
}
