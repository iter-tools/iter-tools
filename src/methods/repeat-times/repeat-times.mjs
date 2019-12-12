import { curry } from '../../internal/curry';
import { wrapWithMethodIterable } from '../../internal/iterable';

export function* repeatTimes(n, item) {
  while (n--) {
    yield item;
  }
}

export default curry(wrapWithMethodIterable(repeatTimes), repeatTimes.length);
