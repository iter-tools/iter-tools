import { AsyncSourceIterable, AsyncResultIterable } from '../../types/async-iterable';

declare function asyncThrottle<T>(
  ms: number,
): (source: AsyncSourceIterable<T>) => AsyncResultIterable<T>;

declare function asyncThrottle<T>(
  ms: number,
  source: AsyncSourceIterable<T>,
): AsyncResultIterable<T>;

export default asyncThrottle;
