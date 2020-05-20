import { wrapWithResultIterable } from '../../internal/iterable';

export function* repeat(value) {
  while (true) {
    yield value;
  }
}

export default wrapWithResultIterable(repeat);
