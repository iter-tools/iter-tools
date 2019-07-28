import { AsyncInputIterable } from './internal/async-iterable';

declare function asyncThrottle<T>(
  n: number,
): (iterable: AsyncInputIterable<T>) => AsyncIterableIterator<T>;

declare function asyncThrottle<T>(
  n: number,
  iterable: AsyncInputIterable<T>,
): AsyncIterableIterator<T>;

export default asyncThrottle;
