import { AsyncSourceIterable, AsyncResultIterable } from '../../types/async-iterable';

declare function asyncBuffer<T>(
  n: number,
): (source: AsyncSourceIterable<T>) => AsyncResultIterable<T>;

declare function asyncBuffer<T>(n: number, source: AsyncSourceIterable<T>): AsyncResultIterable<T>;

export default asyncBuffer;
