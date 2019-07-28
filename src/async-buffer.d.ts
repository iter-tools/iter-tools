import { AsyncInputIterable } from './internal/async-iterable';

declare function asyncBuffer<T>(
  n: number,
): (iterable: AsyncInputIterable<T>) => AsyncIterableIterator<T>;

declare function asyncBuffer<T>(
  n: number,
  iterable: AsyncInputIterable<T>,
): AsyncIterableIterator<T>;

export default asyncBuffer;
