const emptyIterator = {
  next() {
    return { value: undefined, done: true };
  },
};

const emptySpreadable = Object.freeze(
  Object.create({
    [Symbol.iterator]() {
      return emptyIterator;
    },
  }),
);

export function when(condition, value) {
  const valueType = typeof value;
  if (
    !(value == null || value[Symbol.iterator] || valueType === 'object' || valueType === 'function')
  ) {
    throw new Error('Second argument to when must be an object, iterable, or function.');
  }

  return condition && value != null
    ? valueType === 'function'
      ? value()
      : value
    : emptySpreadable;
}
