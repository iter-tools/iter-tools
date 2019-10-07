import { wrapWithMethodIterable } from '../../internal/iterable';

export function* repeat(item, times = Infinity) {
  while (times--) {
    yield item;
  }
}

export default wrapWithMethodIterable(repeat);
