import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $interpose<I>(
  interposeItem: I,
): <T = any>(iterable: $SourceIterable<T>) => $ResultIterable<T | I>;

declare function $interpose<I, T = any>(
  interposeItem: I,
  iterable: $SourceIterable<T>,
): $ResultIterable<T | I>;

export default $interpose;
