import { curry } from '../../internal/curry';
import { wrapWithResultIterable } from '../../internal/iterable';

export function* repeatTimes(n, item) {
  while (n--) {
    yield item;
  }
}

export default curry(wrapWithResultIterable(repeatTimes), repeatTimes.length);
