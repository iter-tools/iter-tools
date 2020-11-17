const identity = (x) => x;

export function compose(...fns) {
  if (!fns.length) fns = [identity];
  return fns.reduce((f, g) => (x) => f(g(x)));
}

export default compose;
