import { AsyncWrappable, AsyncIterableIterator } from '../../types/async-iterable';

declare function asyncInterleaveReady<T>(
  ...sources: Array<AsyncWrappable<T>>
): AsyncIterableIterator<T>;

export { asyncInterleaveReady };
