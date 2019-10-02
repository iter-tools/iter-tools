import { SourceIterable, ResultIterable } from '../../types/iterable';

declare function splitWith<T = any>(
  predicate: (item: T, i: number) => any,
): (iterable: SourceIterable<T>) => ResultIterable<ResultIterable<T>>;

declare function splitWith(
  predicate: (item: string, i: number) => any,
): (iterable: string) => ResultIterable<string>;

declare function splitWith(predicate: RegExp): (iterable: string) => ResultIterable<string>;

declare function splitWith<T = any>(
  predicate: (item: T, i: number) => any,
  iterable: SourceIterable<T>,
): ResultIterable<ResultIterable<T>>;

declare function splitWith(
  predicate: (item: string, i: number) => any,
  iterable: string,
): ResultIterable<string>;

declare function splitWith(predicate: RegExp, iterable: string): ResultIterable<string>;

export default splitWith;
