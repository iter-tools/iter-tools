import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $split(
  separatorValue: any,
): <T>(source: $SourceIterable<T>) => $ResultIterable<$ResultIterable<T>>;

declare function $split<T>(
  separatorValue: any,
  source: $SourceIterable<T>,
): $ResultIterable<$ResultIterable<T>>;

export default $split;
