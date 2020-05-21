export function arrayFirstOr(whenEmpty, array) {
  return array && array.length ? array[0] : whenEmpty;
}

export default arrayFirstOr;
