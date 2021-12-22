const { isArray } = Array;

export function notArray(value) {
  return !isArray(value);
}
