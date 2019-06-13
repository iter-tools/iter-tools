import { GeneratorIterator } from './internal/iterable';
import { $IterableLike, $IterableIterator, $MaybePromise } from './internal/$iterable';

declare function $multiPartition<T = any>(
  func: (item: T) => $MaybePromise<number>,
  iterable: $IterableLike<T>,
): GeneratorIterator<$IterableIterator<T>>;

declare function $multiPartition<T = any>(
  func: (item: T) => $MaybePromise<number>,
): (iterable: $IterableLike<T>) => GeneratorIterator<$IterableIterator<T>>;

export default $multiPartition;
