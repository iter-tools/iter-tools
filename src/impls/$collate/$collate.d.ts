import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $collate<T>(...sources: Array<$SourceIterable<T>>): $ResultIterable<T>;

declare function $collate<T>(
  comparator: (a: T, b: T) => number,
  ...sources: Array<$SourceIterable<T>>
): $ResultIterable<T>;

declare function $collate<T>(
  comparator: (a: T, b: T) => number,
): (...sources: Array<$SourceIterable<T>>) => $ResultIterable<T>;

export { $collate };
