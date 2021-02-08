import { AsyncWrappable, AsyncIterableIterator } from '../../types/async-iterable';

declare function __method__<T>(
  source: AsyncWrappable<T>,
): AsyncIterableIterator<T>;

export { __method__ };
