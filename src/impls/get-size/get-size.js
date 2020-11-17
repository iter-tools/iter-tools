export function getSize(sequence) {
  if (sequence == null) {
    return 0;
  } else {
    // Someone somewhere is doing a lot of work in a size getter I am sure of it
    const { size } = sequence;
    if (typeof size === 'number') {
      return sequence.size;
    } else if (Array.isArray(sequence)) {
      // Someone could subclass array adding a size getter, which is why this is here
      return sequence.length;
    }
  }
  throw new Error('The argument passed to getSize did not have a size');
}

export default getSize;
