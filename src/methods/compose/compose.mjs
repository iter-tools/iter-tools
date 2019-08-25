const identity = x => x;

export default function compose(...fns) {
  if (!fns.length) fns = [identity];
  return fns.reduce((f, g) => x => f(g(x)));
}
