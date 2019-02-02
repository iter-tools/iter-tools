export default function isIterable (i) {
  return Boolean(i && i[Symbol.iterator])
}
