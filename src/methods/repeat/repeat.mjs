import { wrapWithMethodIterable } from '../../internal/iterable';

export function* repeat(item, nTimes = Infinity) {
  let times = nTimes;
  while (times--) {
    yield item;
  }
}

export default wrapWithMethodIterable(repeat);
