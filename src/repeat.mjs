export default function repeat (obj, nTimes = Infinity) {
  return {
    * [Symbol.iterator] () {
      let times = nTimes
      while (times--) {
        yield obj
      }
    }
  }
}
