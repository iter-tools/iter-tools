import { AsyncInputIterable, AsyncGeneratorIterator } from '../../internal/async-iterable';

declare function asyncInterleaveReady<T = any>(
  ...iterables: Array<AsyncInputIterable<T>>
): AsyncGeneratorIterator<T>;

export default asyncInterleaveReady;
