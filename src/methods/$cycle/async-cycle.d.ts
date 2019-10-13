import { AsyncSourceIterable, AsyncResultIterable } from '../../types/async-iterable';

declare function asyncCycle<T = any>(
  count: number,
  iterable: AsyncSourceIterable<T>,
): AsyncResultIterable<T>;

declare function asyncCycle<T = any>(
  count: number,
): (iterable: AsyncSourceIterable<T>) => AsyncResultIterable<T>;

declare function asyncCycle<T = any>(iterable: AsyncSourceIterable<T>): AsyncResultIterable<T>;

export default asyncCycle;
