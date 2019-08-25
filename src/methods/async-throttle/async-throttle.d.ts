import { AsyncInputIterable, AsyncGeneratorIterator } from '../../internal/async-iterable';

declare function asyncThrottle<T>(
  n: number,
): (iterable: AsyncInputIterable<T>) => AsyncGeneratorIterator<T>;

declare function asyncThrottle<T>(
  n: number,
  iterable: AsyncInputIterable<T>,
): AsyncGeneratorIterator<T>;

export default asyncThrottle;
