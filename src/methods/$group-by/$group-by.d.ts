import { $InputIterable, $GeneratorIterator, $MaybePromise } from '../../internal/$iterable';

declare function $groupBy(
  key: null | undefined,
): <T = any>(iterable: $InputIterable<T>) => $GeneratorIterator<[T, $GeneratorIterator<T>]>;

declare function $groupBy<K, T = any>(
  key: (item: T) => $MaybePromise<K>,
): (iterable: $InputIterable<T>) => $GeneratorIterator<[K, $GeneratorIterator<T>]>;

declare function $groupBy<T = any>(
  key: null | undefined,
  iterable: $InputIterable<T>,
): $GeneratorIterator<[T, $GeneratorIterator<T>]>;

declare function $groupBy<K, T = any>(
  key: (item: T) => $MaybePromise<K>,
  iterable: $InputIterable<T>,
): $GeneratorIterator<[K, $GeneratorIterator<T>]>;

export default $groupBy;
