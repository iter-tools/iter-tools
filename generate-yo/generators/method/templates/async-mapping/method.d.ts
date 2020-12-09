import { AsyncSourceIterable, AsyncResultIterable } from '../../types/async-iterable';

declare function __method__<T>(
  source: AsyncSourceIterable<T>,
): AsyncResultIterable<T>;

export { __method__ };
