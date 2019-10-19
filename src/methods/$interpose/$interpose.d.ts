import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $interpose<I>(
  interposeItem: I,
): <T>(source: $SourceIterable<T>) => $ResultIterable<T | I>;

declare function $interpose<I, T>(
  interposeItem: I,
  source: $SourceIterable<T>,
): $ResultIterable<T | I>;

export default $interpose;
