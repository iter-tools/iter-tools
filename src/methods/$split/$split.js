import { $map } from '../$map/$map';

function* iterableOf(...items) {
  yield* items;
}

function $split(source) {
  // String iterators already return an exploded version of the string.
  if (typeof source === 'string') {
    return source;
  } else {
    return $map(source, item => iterableOf(item));
  }
}

export default $split;
