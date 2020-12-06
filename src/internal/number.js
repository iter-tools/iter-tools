export function isInteger(value, nonZero = false) {
  // isFinite(null) is true >_<
  return typeof value === 'number' && !isNaN(value) && isFinite(value) && !(nonZero && value === 0);
}

export function isPositiveInteger(value, nonZero = false) {
  return isInteger(value) && (nonZero ? value > 0 : value >= 0);
}

export function isIntegerOrInfinite(value, nonZero = false) {
  return typeof value === 'number' && !isNaN(value) && !(nonZero && value === 0);
}
