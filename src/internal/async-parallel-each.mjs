function* map(iterable, cb) {
  for (const value of iterable) yield cb(value);
}

export function asyncParallelEach(iterable, cb) {
  return Promise.all(map(iterable, cb));
}
