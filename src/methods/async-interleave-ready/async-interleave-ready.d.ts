import { AsyncSourceIterable, AsyncResultIterable } from '../../types/async-iterable';

declare function asyncInterleaveReady<T>(
  ...sources: Array<AsyncSourceIterable<T>>
): AsyncResultIterable<T>;

export default asyncInterleaveReady;
