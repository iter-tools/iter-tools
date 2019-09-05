import { $InputIterable, $GeneratorIterator, $MaybePromise } from '../../internal/$iterable';

declare function $splitWith<T = any>(
  predicate: (item: T, i: number) => $MaybePromise<any>,
): (iterable: $InputIterable<T>) => $GeneratorIterator<$GeneratorIterator<T>>;

declare function $splitWith(
  predicate: (item: String, i: number) => $MaybePromise<any>,
): (iterable: String) => $GeneratorIterator<String>;

declare function $splitWith<T = any>(
  predicate: (item: T, i: number) => $MaybePromise<any>,
  iterable: $InputIterable<T>,
): $GeneratorIterator<$GeneratorIterator<T>>;

declare function $splitWith(
  predicate: (item: String, i: number) => $MaybePromise<any>,
  iterable: String,
): $GeneratorIterator<String>;

export default $splitWith;
