export default function pipeline (value, ...fns) {
  return fns.reduce((value, fn) => fn(value), value)
}
