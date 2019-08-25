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

function when(condition, value) {
  if (
    value != null &&
    !(typeof value[Symbol.iterator] === 'function' || typeof value === 'object')
  ) {
    throw new Error('Second argument to when must be an object or iterable.');
  }

  return condition && value != null ? value : emptySpreadable;
}

export default when;
