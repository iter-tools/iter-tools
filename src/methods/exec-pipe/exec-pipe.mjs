export function execPipe(initial, ...fns) {
  return fns.reduce((value, fn) => fn(value), initial);
}

export default execPipe;
