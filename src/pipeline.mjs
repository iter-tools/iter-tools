export default function pipeline (iterable, ...fns) {
  return fns.reduce((iterable, fn) => fn(iterable), iterable)
}
