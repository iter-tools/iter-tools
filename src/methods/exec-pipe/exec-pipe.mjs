export default function execPipe(value, ...fns) {
  return fns.reduce((value, fn) => fn(value), value);
}
