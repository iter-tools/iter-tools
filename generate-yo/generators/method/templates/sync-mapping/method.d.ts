import { Wrappable, IterableIterator } from '../../types/iterable';

declare function __method__<T>(
  source: Wrappable<T>,
): IterableIterator<T>;

export { __method__ };
