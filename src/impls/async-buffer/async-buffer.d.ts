import { AsyncWrappable, SingletonAsyncIterableIterator } from '../../types/async-iterable';

declare function asyncBuffer<T>(
  n: number,
): (source: AsyncWrappable<T>) => SingletonAsyncIterableIterator<T>;

declare function asyncBuffer<T>(
  n: number,
  source: AsyncWrappable<T>,
): SingletonAsyncIterableIterator<T>;

export { asyncBuffer };
