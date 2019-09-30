import { $MaybePromise } from '../../../generate/async.macro';

import { $InputIterable, $GeneratorIterator } from '../../internal/$iterable';

declare function $filter<S extends T, T = any>(
  func: (item: T, i: number) => item is S,
): (iterable: $InputIterable<T>) => $GeneratorIterator<S>;

declare function $filter<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
): (iterable: $InputIterable<T>) => $GeneratorIterator<T>;

declare function $filter<S extends T, T = any>(
  func: (item: T, i: number) => item is S,
  iterable: $InputIterable<T>,
): $GeneratorIterator<S>;

declare function $filter<T = any>(
  func: (item: T, i: number) => $MaybePromise<boolean>,
  iterable: $InputIterable<T>,
): $GeneratorIterator<T>;

export default $filter;
