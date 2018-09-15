/// <reference lib="es2018" />
/// <reference lib="esnext.asynciterable" />

import { IsFinite, Prepend, Repeat, Reverse } from "typescript-tuple";
import { FromTuple as UnionFromTuple, RangeZero as UnionRange } from "typescript-union";

type IterableLike<T> = Iterable<T> | T[] | { [key: string]: T; } | { [key: number]: T; };
type AsyncIterableLike<T> = AsyncIterable<T> | IterableLike<T>;
type ReasonableNumber = UnionRange<32>;

/**
 * Function signature of `permutations` and `combinations`
 */
interface ICombinationsPermutations {
  <Iter extends IterableLike<any>>(iterable: Iter, r?: undefined): CombinationsPermutationsByIterable<Iter>;
  <T, R extends number>(iterable: IterableLike<T>, r: R): CombinationsPermutationsByLength<T, R>;
}

type CombinationsPermutationsByIterable<Iter extends IterableLike<any>> =
  Iter extends Iterable<infer T>
    ? Iter extends T[]
      ? CombinationsPermutationsByLength<T, Iter["length"]>
      : Iterable<T[]>
    : never;

type CombinationsPermutationsByLength<T, R extends number> =
  Iterable<R extends ReasonableNumber ? Repeat<T, R> : T[]>;

/**
 * Helper generic for `product` function
 * This creates element type of returning iterable from argument types
 *
 * @example
 *   `ProductReturnElement<[string[], number[], boolean[]]>` is `[string, number, boolean]`
 */
type ProductReturnElement<Args extends Array<Iterable<any>>, Holder extends any[] = []> = {
  empty: Holder,
  many: ((...a: Reverse<Args>) => any) extends ((a: infer Last, ...b: infer ReversedRest) => any)
    ? ProductReturnElement<
      Reverse<ReversedRest>,
      Prepend<Holder, Last extends Iterable<infer T> ? T : never>
    >
    : never,
  infinite: Args extends Array<Array<infer T>> ? T[] : never
}[
  Args extends [] ? "empty" : IsFinite<Args, "many", "infinite">
];

type RangeReturn<R extends number> =
  R extends ReasonableNumber ? Repeat<UnionRange<R>, R> : Iterable<number>;

// Sync
export declare function keys(iterable: any): Iterable<any>;
export declare function values(iterable: any): Iterable<any>;
export declare function entries(iterable: any): Iterable<any>;

export declare function batch<T>(n: number): (iterable: IterableLike<T>) => Iterable<Iterable<T>>;
export declare function batch<T>(n: number, iterable: IterableLike<T>): Iterable<Iterable<T>>;

export declare function chain<T>(...iterables: Array<IterableLike<T>>): Iterable<T>;
export declare function concat<T>(...iterables: Array<IterableLike<T>>): Iterable<T>;

export declare const combinations: ICombinationsPermutations;
export declare const combinationsWithReplacement: ICombinationsPermutations;

export declare function compose<T>(fns: IterableLike<(_: T) => T>): Iterable<T>;

export declare function compress<T>(iterable: IterableLike<T>, compress: IterableLike<boolean>): Iterable<T>;

export declare function consume<T>(func: (item: T) => void): (iterable: IterableLike<T>) => void;
export declare function consume<T>(func: (item: T) => void, iterable: IterableLike<T>): void;

export declare function count(opts: number | { start: number, end?: number, step?: number }): Iterable<number>;

export declare function cycle<Iter extends IterableLike<any>>(iterable: Iter):
  Iter extends any[] ? Iterable<UnionFromTuple<Iter>> : Iter;

export declare function dropWhile<T>(func: (item: T) => boolean): (iterable: IterableLike<T>) => Iterable<T>;
export declare function dropWhile<T>(func: (item: T) => boolean, iterable: IterableLike<T>): Iterable<T>;

export declare function enumerate<T>(iterable: IterableLike<T>, start?: number): Iterable<[number, T]>;

export declare function execute<T, Args extends any[] = any[]>(
  func: (...args: Args) => T,
  ...args: Args
): Iterable<T>;

export declare function every<T>(func: (item: T) => boolean): (iterable: IterableLike<T>) => boolean;
export declare function every<T>(func: (item: T) => boolean, iterable: IterableLike<T>): boolean;

export declare function filter<T>(func: (item: T) => boolean): (iterable: IterableLike<T>) => Iterable<T>;
export declare function filter<T>(func: (item: T) => boolean, iterable: IterableLike<T>): Iterable<T>;

export declare function find<T>(func: (item: T) => boolean): (iterable: IterableLike<T>) => T | null;
export declare function find<T>(func: (item: T) => boolean, iterable: IterableLike<T>): T | null;

export declare function first<Iter extends IterableLike<any>>(iterable: Iter):
  Iter extends [] ? undefined :
  Iter extends [infer First, ...any[]] ? First :
  Iter extends IterableLike<infer T> ? T | undefined :
  never;

export declare function flatMap<T, O>(func: (item: T) => IterableLike<O>): (iter: IterableLike<T>) => Iterable<O>;
export declare function flatMap<T, O>(func: (item: T) => IterableLike<O>, iter: IterableLike<T>): Iterable<O>;

export declare function groupBy<T, K>(key: (item: T) => K): (iterable: IterableLike<T>) => Iterable<[K, Iterable<T>]>;
export declare function groupBy<T, K>(key: (item: T) => K, iterable: IterableLike<T>): Iterable<[K, Iterable<T>]>;

export declare function iterable<T>(iterator: { next: () => {value: T} } | IterableLike<T>): Iterable<T>;

export declare function map<T, O>(func: (item: T) => O): (iter: IterableLike<T>) => Iterable<O>;
export declare function map<T, O>(func: (item: T) => O, iter: IterableLike<T>): Iterable<O>;

export declare const permutations: ICombinationsPermutations;

export declare function product<Args extends Array<Iterable<any>>>(...iterables: Args):
  Iterable<ProductReturnElement<Args>>;

export declare function range<R extends number>(r: R): RangeReturn<R>;
export declare function range(opts: { start: number, end?: number, step?: number }): Iterable<number>;

export declare function reduce<T, O>(func: (acc: O, item: T, c: number) => O): (iterable: IterableLike<T>) => O;
export declare function reduce<T, O>(initial: O, func: (acc: O, item: T, c: number) => O):
    (iterable: IterableLike<T>) => O;
export declare function reduce<T, O>(func: (acc: O, item: T, c: number) => O, iterable: IterableLike<T>): O;
export declare function reduce<T, O>(initial: O, func: (acc: O, item: T, c: number) => O, iterable: IterableLike<T>): O;

export declare function regexpExec(re: RegExp): (str: string) => Iterable<string>;
export declare function regexpExec(re: RegExp, str: string): Iterable<string>;

export declare function regexpSplit(re: RegExp): (str: string) => Iterable<string>;
export declare function regexpSplit(re: RegExp, str: string): Iterable<string>;

export declare function regexpSplitIter(re: RegExp): (iterable: IterableLike<string>) => Iterable<string>;
export declare function regexpSplitIter(re: RegExp, iterable: IterableLike<string>): Iterable<string>;

export declare function regexpExecIter(re: RegExp): (iterable: IterableLike<string>) => Iterable<string>;
export declare function regexpExecIter(re: RegExp, iterable: IterableLike<string>): Iterable<string>;

export declare function splitLines(iterable: IterableLike<string>): Iterable<string>;

export declare function repeat<T>(obj: T, times?: number): Iterable<T>;

export declare function size<Iter extends Iterable<any>>(iterable: Iter):
  Iter extends any[] ? Iter["length"] : number;

export declare function slice<T>(
    opts: number | { start: number, end?: number, step?: number },
    iterable: IterableLike<T>,
): Iterable<number>;

export declare function some<T>(func: (item: T) => boolean): (iterable: IterableLike<T>) => boolean;
export declare function some<T>(func: (item: T) => boolean, iterable: IterableLike<T>): boolean;

export declare function takeWhile<T>(func: (item: T) => boolean): (iterable: IterableLike<T>) => Iterable<T>;
export declare function takeWhile<T>(func: (item: T) => boolean, iterable: IterableLike<T>): Iterable<T>;

export declare function tap<T>(func: (item: T, c: number) => any, iterable: IterableLike<T>): Iterable<T>;

export declare function takeSorted<T>(
    n: number,
    func?: (item: T) => boolean,
): (iterable: IterableLike<T>) => Iterable<T>;
export declare function takeSorted<T>(
    n: number,
    func?: (item: T) => boolean,
    iterable?: IterableLike<T>,
): Iterable<T>;

export declare function tee<T>(iterable: IterableLike<T>, n?: number): Array<Iterable<T>>;

export declare function toArray<T>(iterable: IterableLike<T>): T[];

export declare function zipLongest<T>(...iterables: Array<IterableLike<T>>): Iterable<T[]>;
export declare function zipAll<T>(...iterables: Array<IterableLike<T>>): Iterable<T[]>;
export declare function zip<T>(...iterables: Array<IterableLike<T>>): Iterable<T[]>;

/**
 * @deprecated Use `iterable` instead
 */
export declare function iter<T>(iterable: IterableLike<T>): Iterable<T>;

// Async
export declare function asyncBatch<T>(n: number): (iterable: AsyncIterableLike<T>) => AsyncIterable<T>;
export declare function asyncBatch<T>(n: number, iterable: AsyncIterableLike<T>): AsyncIterable<T>;

export declare function asyncChain<T>(...iterables: Array<AsyncIterableLike<T>>): AsyncIterable<T>;
export declare function asyncConcat<T>(...iterables: Array<AsyncIterableLike<T>>): AsyncIterable<T>;

export declare function asyncConsume<T>(func: (item: T) => void): (iterable: AsyncIterableLike<T>) => void;
export declare function asyncConsume<T>(func: (item: T) => void, iterable: AsyncIterableLike<T>): void;

export declare function asyncCompress<T>(
    iterable: AsyncIterableLike<T>,
    compress: AsyncIterableLike<boolean>,
): AsyncIterable<T>;

export declare function asyncCycle<T>(iterable: AsyncIterableLike<T>): AsyncIterable<T>;

export declare function asyncDropWhile<T>(func: (item: T) => boolean):
    (iterable: AsyncIterableLike<T>) => AsyncIterable<T>;
export declare function asyncDropWhile<T>(func: (item: T) => boolean, iterable: AsyncIterableLike<T>):
    AsyncIterable<T>;

export declare function asyncEnumerate<T>(iterable: AsyncIterableLike<T>, start?: number): AsyncIterable<[number, T]>;

export declare function asyncEvery<T>(func: (item: T) => boolean): (iterable: AsyncIterableLike<T>) => boolean;
export declare function asyncEvery<T>(func: (item: T) => boolean, iterable: AsyncIterableLike<T>): boolean;

export declare function asyncExecute<T, Args extends any[] = any[]>(
  func: (...args: Args) => Promise<T>,
  ...args: Args
): AsyncIterable<T>;

export declare function asyncFilter<T>(func: (item: T) => boolean):
    (iterable: AsyncIterableLike<T>) => AsyncIterable<T>;
export declare function asyncFilter<T>(func: (item: T) => boolean, iterable: AsyncIterableLike<T>):
    AsyncIterable<T>;

export declare function asyncFind<T>(func: (item: T) => boolean): (iterable: AsyncIterableLike<T>) => T | null;
export declare function asyncFind<T>(func: (item: T) => boolean, iterable: AsyncIterableLike<T>): T | null;

export declare function asyncFirst<T>(iterable: AsyncIterableLike<T>): T | undefined;

export declare function asyncFlatMap<T, O>(func: (item: T) => AsyncIterableLike<O>):
    (iter: AsyncIterableLike<T>) => AsyncIterable<O>;
export declare function asyncFlatMap<T, O>(func: (item: T) => AsyncIterableLike<O>, iter: AsyncIterableLike<T>):
    AsyncIterable<O>;

export declare function asyncGroupBy<T, K>(key: (item: T) => K):
    (iterable: AsyncIterableLike<T>) => Iterable<[K, Iterable<T>]>;
export declare function asyncGroupBy<T, K>(key: (item: T) => K, iterable: AsyncIterableLike<T>):
    Iterable<[K, Iterable<T>]>;

export declare function AsyncIterable<T>(asyncIterator: { next: () => Promise<{value: T}> } | AsyncIterableLike<T>):
    AsyncIterable<T>;

export declare function asyncMap<T, O>(func: (item: T) => O): (iter: AsyncIterableLike<T>) => AsyncIterable<O>;
export declare function asyncMap<T, O>(func: (item: T) => O, iter: AsyncIterableLike<T>): AsyncIterable<O>;

export declare function asyncReduce<T, O>(func: (acc: O, item: T, c: number) => O):
    (iterable: AsyncIterableLike<T>) => O;
export declare function asyncReduce<T, O>(initial: O, func: (acc: O, item: T, c: number) => O):
    (iterable: AsyncIterableLike<T>) => O;
export declare function asyncReduce<T, O>(func: (acc: O, item: T, c: number) => O, iterable: AsyncIterableLike<T>): O;
export declare function asyncReduce<T, O>(
    initial: O,
    func: (acc: O, item: T, c: number) => O,
    iterable: AsyncIterableLike<T>,
): O;

export declare function asyncSize(iterable: AsyncIterable<any>): number;

export declare function asyncSlice<T>(
    opts: number | { start: number, end?: number, step?: number },
    iterable: AsyncIterableLike<T>,
): AsyncIterable<number>;

export declare function asyncTakeWhile<T>(func: (item: T) => boolean):
    (iterable: AsyncIterableLike<T>) => AsyncIterable<T>;
export declare function asyncTakeWhile<T>(func: (item: T) => boolean, iterable: AsyncIterableLike<T>):
    AsyncIterable<T>;

export declare function asyncTap<T>(func: (item: T, c: number) => any, iterable: AsyncIterableLike<T>):
    AsyncIterable<T>;

export declare function asyncTakeSorted<T>(n: number, func?: (item: T) => boolean):
    (iterable: AsyncIterableLike<T>) => AsyncIterableLike<T>;
export declare function asyncTakeSorted<T>(n: number, func?: (item: T) => boolean, iterable?: AsyncIterableLike<T>):
    AsyncIterableLike<T>;

export declare function asyncTee<T>(iterable: AsyncIterableLike<T>, n?: number): Array<AsyncIterable<T>>;

export declare function asyncToArray<T>(iterable: AsyncIterableLike<T>): T[];

export declare function asyncZipLongest<T>(...iterables: Array<AsyncIterableLike<T>>): AsyncIterable<T[]>;
export declare function asyncZipAll<T>(...iterables: Array<AsyncIterableLike<T>>): AsyncIterable<T[]>;

export declare function asyncZip<T>(...iterables: Array<AsyncIterableLike<T>>): AsyncIterable<T[]>;

export declare function asyncRegexpSplitIter(re: RegExp):
    (iterable: AsyncIterableLike<string>) => AsyncIterableLike<string>;
export declare function asyncRegexpSplitIter(re: RegExp, iterable: AsyncIterableLike<string>):
    AsyncIterableLike<string>;

export declare function asyncRegexpExecIter(re: RegExp):
    (iterable: AsyncIterableLike<string>) => AsyncIterableLike<string>;
export declare function asyncRegexpExecIter(re: RegExp, iterable: AsyncIterableLike<string>):
    AsyncIterableLike<string>;

export declare function asyncSplitLines(iterable: AsyncIterableLike<string>): AsyncIterableLike<string>;

export declare function asyncSome<T>(func: (item: T) => boolean): (iterable: AsyncIterableLike<T>) => boolean;
export declare function asyncSome<T>(func: (item: T) => boolean, iterable: AsyncIterableLike<T>): boolean;

export declare function asyncBuffer<T>(n: number): (iterable: AsyncIterableLike<T>) => AsyncIterable<T>;
export declare function asyncBuffer<T>(n: number, iterable: AsyncIterableLike<T>): AsyncIterable<T>;

export declare function asyncThrottle<T>(n: number): (iterable: AsyncIterableLike<T>) => AsyncIterable<T>;
export declare function asyncThrottle<T>(n: number, iterable: AsyncIterableLike<T>): AsyncIterable<T>;

/**
 * @deprecated Use `asyncIterable` instead
 */
export declare function asyncIter<T>(syncIterable: AsyncIterableLike<T>): AsyncIterable<T>;
