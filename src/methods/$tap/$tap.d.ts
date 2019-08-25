import { $InputIterable, $GeneratorIterator, $MaybePromise } from '../../internal/$iterable';

declare function $tap<T = any>(
  func: (item: T, i: number) => $MaybePromise<any>,
): (iterable: $InputIterable<T>) => $GeneratorIterator<T>;

declare function $tap<T = any>(
  func: (item: T, i: number) => $MaybePromise<any>,
  iterable: $InputIterable<T>,
): $GeneratorIterator<T>;

export default $tap;
