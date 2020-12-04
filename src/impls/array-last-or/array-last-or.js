export function arrayLastOr(whenEmpty, array) {
  return array && array.length ? array[array.length - 1] : whenEmpty;
}
