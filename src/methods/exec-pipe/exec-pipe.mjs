export function execPipe(value, ...fns) {
  return fns.reduce((value, fn) => fn(value), value);
}

export default execPipe;
