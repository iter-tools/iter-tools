import { AsyncIterableLike } from './internal/async-iterable';

declare function asyncThrottle<T>(
  n: number,
): (iterable: AsyncIterableLike<T>) => AsyncIterableIterator<T>;

declare function asyncThrottle<T>(
  n: number,
  iterable: AsyncIterableLike<T>,
): AsyncIterableIterator<T>;

export default asyncThrottle;
