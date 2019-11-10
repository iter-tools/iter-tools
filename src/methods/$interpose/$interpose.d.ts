import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $interpose<I>(
  interposed: I,
): <T>(source: $SourceIterable<T>) => $ResultIterable<T | I>;

declare function $interpose<I, T>(
  interposed: I,
  source: $SourceIterable<T>,
): $ResultIterable<T | I>;

export default $interpose;
