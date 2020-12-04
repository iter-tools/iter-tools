import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $splitOn(
  separatorValue: any,
): <T>(source: $SourceIterable<T>) => $ResultIterable<$ResultIterable<T>>;

declare function $splitOn<T>(
  separatorValue: any,
  source: $SourceIterable<T>,
): $ResultIterable<$ResultIterable<T>>;

export { $splitOn };
