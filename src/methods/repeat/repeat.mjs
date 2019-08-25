import { wrapWithMethodIterable } from '../../internal/iterable';

function* repeat(obj, nTimes = Infinity) {
  let times = nTimes;
  while (times--) {
    yield obj;
  }
}

export default wrapWithMethodIterable(repeat);
