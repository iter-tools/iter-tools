import { $map } from '../$map/$map';

function* iterableOf(...items) {
  yield* items;
}

function $split(iterable) {
  // String iterators already return an exploded version of the string.
  if (typeof iterable === 'string') {
    return iterable;
  } else {
    return $map(iterable, item => iterableOf(item));
  }
}

export default $split;
