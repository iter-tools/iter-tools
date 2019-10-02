import { SourceIterable, ResultIterable } from '../../types/iterable';

declare function splitWith<T = any>(
  predicate: (item: T, i: number) => any,
): (source: SourceIterable<T>) => ResultIterable<ResultIterable<T>>;

declare function splitWith(
  predicate: (item: string, i: number) => any,
): (source: string) => ResultIterable<string>;

declare function splitWith(predicate: RegExp): (source: string) => ResultIterable<string>;

declare function splitWith<T = any>(
  predicate: (item: T, i: number) => any,
  source: SourceIterable<T>,
): ResultIterable<ResultIterable<T>>;

declare function splitWith(
  predicate: (item: string, i: number) => any,
  source: string,
): ResultIterable<string>;

declare function splitWith(predicate: RegExp, source: string): ResultIterable<string>;

export default splitWith;
