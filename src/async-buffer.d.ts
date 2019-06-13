import { AsyncIterableLike } from './internal/async-iterable';

declare function asyncBuffer<T>(
  n: number,
): (iterable: AsyncIterableLike<T>) => AsyncIterableIterator<T>;

declare function asyncBuffer<T>(
  n: number,
  iterable: AsyncIterableLike<T>,
): AsyncIterableIterator<T>;

export default asyncBuffer;
