import { AsyncSourceIterable, AsyncResultIterable } from '../../types/async-iterable';

declare function asyncCycle<T>(
  count: number,
  iterable: AsyncSourceIterable<T>,
): AsyncResultIterable<T>;

declare function asyncCycle<T>(
  count: number,
): (iterable: AsyncSourceIterable<T>) => AsyncResultIterable<T>;

declare function asyncCycle<T>(iterable: AsyncSourceIterable<T>): AsyncResultIterable<T>;

export default asyncCycle;
