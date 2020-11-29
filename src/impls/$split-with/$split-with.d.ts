import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function splitWith<T>(
  predicate: (value: T, i: number) => any,
): (source: $SourceIterable<T>) => $ResultIterable<$ResultIterable<T>>;

declare function splitWith<T>(
  predicate: (value: T, i: number) => any,
  source: $SourceIterable<T>,
): $ResultIterable<$ResultIterable<T>>;

export default splitWith;
