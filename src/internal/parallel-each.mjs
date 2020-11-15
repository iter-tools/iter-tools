export function parallelEach(iterable, cb) {
  for (const value of iterable) cb(value);
}
