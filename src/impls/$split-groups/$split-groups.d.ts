import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $splitGroups<T>(
  source: $SourceIterable<T>,
): $ResultIterable<[T, $ResultIterable<T>]>;

export { $splitGroups };
