export function stringSplitAt(str, idx) {
  return [str.slice(0, idx), str.slice(idx, Infinity)];
}
