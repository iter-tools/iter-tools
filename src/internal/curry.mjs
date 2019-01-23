export default function curry (fn) {
  function nest (len, args) {
    return (...xs) => {
      if (len - xs.length <= 0) {
        return fn(...args, ...xs)
      }
      return nest(len - xs.length, [...args, ...xs])
    }
  }
  return nest(fn.length, [])
}
