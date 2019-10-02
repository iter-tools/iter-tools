import { AsyncSourceIterable, AsyncResultIterable } from '../../types/async-iterable';

declare function asyncInterleaveReady<T = any>(
  ...iterables: Array<AsyncSourceIterable<T>>
): AsyncResultIterable<T>;

export default asyncInterleaveReady;
