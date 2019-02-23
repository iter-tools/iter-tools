const emptyArray = []

export default function apply (fn, args = emptyArray) {
  return fn(...args)
}
