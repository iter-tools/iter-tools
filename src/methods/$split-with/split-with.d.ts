import { SourceIterable, ResultIterable, ResultSubseqIterable } from '../../types/iterable';

declare function splitWith<T>(
  predicate: (item: T, i: number) => any,
): (source: SourceIterable<T>) => ResultIterable<ResultSubseqIterable<T>>;

declare function splitWith(
  predicate: (item: string, i: number) => any,
): (source: string) => ResultIterable<string>;

declare function splitWith(predicate: RegExp): (source: string) => ResultIterable<string>;

declare function splitWith<T>(
  predicate: (item: T, i: number) => any,
  source: SourceIterable<T>,
): ResultIterable<ResultSubseqIterable<T>>;

declare function splitWith(
  predicate: (item: string, i: number) => any,
  source: string,
): ResultIterable<string>;

declare function splitWith(predicate: RegExp, source: string): ResultIterable<string>;

export default splitWith;
