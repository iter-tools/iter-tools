export default function pipe (value, ...fns) {
  return fns.reduce((value, fn) => fn(value), value)
}
