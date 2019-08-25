import { $InputIterable, $GeneratorIterator, $MaybePromise } from '../../internal/$iterable';

declare function $map<O, T = any>(
  func: (item: T) => $MaybePromise<O>,
): (iterable: $InputIterable<T>) => $GeneratorIterator<O>;

declare function $map<O, T = any>(
  func: (item: T) => $MaybePromise<O>,
  iterable: $InputIterable<T>,
): $GeneratorIterator<O>;

export default $map;
