import iter from './iter'

export default function size (iterable) {
  let size = 0
  // eslint-disable-next-line
  for (const _ of iter(iterable)) {
    size++
  }
  return size
}
