import { AsyncSourceIterable, AsyncResultIterable } from '../../types/async-iterable';

declare function asyncBuffer<T>(
  n: number,
): (iterable: AsyncSourceIterable<T>) => AsyncResultIterable<T>;

declare function asyncBuffer<T>(
  n: number,
  iterable: AsyncSourceIterable<T>,
): AsyncResultIterable<T>;

export default asyncBuffer;
