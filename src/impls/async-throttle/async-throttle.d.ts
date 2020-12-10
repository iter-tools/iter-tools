import { AsyncWrappable, AsyncIterableIterator } from '../../types/async-iterable';

declare function asyncThrottle<T>(
  intervalMs: number,
): (source: AsyncWrappable<T>) => AsyncIterableIterator<T>;

declare function asyncThrottle<T>(
  intervalMs: number,
  source: AsyncWrappable<T>,
): AsyncIterableIterator<T>;

export { asyncThrottle };
