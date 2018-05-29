export default function * repeat (obj, times = Infinity) {
  while (times--) {
    yield obj
  }
}
