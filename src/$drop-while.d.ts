import { $InputIterable, $GeneratorIterator, $MaybePromise } from './internal/$iterable';

declare function $dropWhile<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
): (iterable: $InputIterable<T>) => $GeneratorIterator<T>;

declare function $dropWhile<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
  iterable: $InputIterable<T>,
): $GeneratorIterator<T>;

export default $dropWhile;
