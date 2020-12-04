import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $splitOnAny(
  separatorValues: Array<any>,
): <T>(source: $SourceIterable<T>) => $ResultIterable<$ResultIterable<T>>;

declare function $splitOnAny<T>(
  separatorValues: Array<any>,
  source: $SourceIterable<T>,
): $ResultIterable<$ResultIterable<T>>;

export { $splitOnAny };
