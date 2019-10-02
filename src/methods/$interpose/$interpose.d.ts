import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $interpose<I>(
  interposeItem: I,
): <T = any>(source: $SourceIterable<T>) => $ResultIterable<T | I>;

declare function $interpose<I, T = any>(
  interposeItem: I,
  source: $SourceIterable<T>,
): $ResultIterable<T | I>;

export default $interpose;
