import { InputIterable, GeneratorIterator, MaybePromise } from '../../internal/iterable';

declare function splitWith<T = any>(
  predicate: (item: T, i: number) => MaybePromise<any>,
): (iterable: InputIterable<T>) => GeneratorIterator<GeneratorIterator<T>>;

declare function splitWith(
  predicate: (item: string, i: number) => MaybePromise<any>,
): (iterable: string) => GeneratorIterator<string>;

declare function splitWith(predicate: RegExp): (iterable: string) => GeneratorIterator<string>;

declare function splitWith<T = any>(
  predicate: (item: T, i: number) => MaybePromise<any>,
  iterable: InputIterable<T>,
): GeneratorIterator<GeneratorIterator<T>>;

declare function splitWith(
  predicate: (item: string, i: number) => MaybePromise<any>,
  iterable: string,
): GeneratorIterator<string>;

declare function splitWith(predicate: RegExp, iterable: string): GeneratorIterator<string>;

export default splitWith;
