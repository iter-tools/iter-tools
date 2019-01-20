// tslint:disable:unified-signatures
/// <reference lib="es2018" />
/// <reference lib="esnext.asynciterable" />

import { IsFinite, Prepend, Repeat, Reverse } from 'typescript-tuple'
import { FromTuple as UnionFromTuple, RangeZero as UnionRange } from 'typescript-union'
import { SetComplement } from 'utility-types'

type AsyncIterableLike<T> = AsyncIterable<T> | Iterable<T>
type ReasonableNumber = UnionRange<32>
type IterableElement<Iter> = Iter extends Iterable<infer X> ? X : never
type AsyncIterableElement<Iter> = Iter extends AsyncIterableLike<infer X> ? X : never
type ToIterator<Iter> = IterableIterator<IterableElement<Iter>>
type MaybePromise<T> = T | Promise<T>

type Tail<Tuple extends any[]> =
  ((...args: Tuple) => any) extends ((a: any, ...b: infer Rest) => any)
    ? Rest
    : never

/**
 * Function signature of `permutations` and `combinations`
 */
interface CombinationsPermutations {
  <Iter extends Iterable<any>>(iterable: Iter, r?: undefined): CombinationsPermutationsByIterable<Iter>
  <T, R extends number>(iterable: Iterable<T>, r: R): CombinationsPermutationsByLength<T, R>
}

type CombinationsPermutationsByIterable<Iter extends Iterable<any>> =
  Iter extends Iterable<infer T>
    ? Iter extends T[]
      ? CombinationsPermutationsByLength<T, Iter['length']>
      : (Iterable<T[]> & { getSize: () => number })
    : never

type CombinationsPermutationsByLength<T, R extends number> =
  Iterable<R extends ReasonableNumber ? Repeat<T, R> : T[]> &
  { readonly getSize: () => number }

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
  Args extends [] ? 'empty' : IsFinite<Args, 'many', 'infinite'>
]

type RangeReturn<R extends number> =
  IterableIterator<R extends ReasonableNumber ? UnionRange<R> : number>

type FlatReturnElement<
  Depth extends number,
  MaybeIterable,
  DepthStack extends any[] = []
> = {
  matched: MaybeIterable
  union: Depth extends DepthStack['length'] | infer Rest ? Rest extends number ?
      FlatReturnElement<DepthStack['length'], MaybeIterable> |
      FlatReturnElement<Rest, MaybeIterable>
    : never : never
  unmatched: MaybeIterable extends Iterable<infer Next>
    ? FlatReturnElement<Depth, Next, Prepend<DepthStack, any>>
    : MaybeIterable
}[
  DepthStack['length'] extends Depth
    ? Depth extends DepthStack['length']
      ? 'matched'
      : 'union'
    : 'unmatched'
]

type FlatReturnTransform<Type> = Type extends Iterable<infer X>
  ? IterableIterator<X>
  : never

type FlatReturn<
  Depth extends ReasonableNumber,
  Iter extends Iterable<any>
> = IterableIterator<FlatReturnElement<
  Depth,
  IterableElement<Iter>
>>

type AsyncFlatReturnElement<
  Depth extends number,
  MaybeIterable,
  DepthStack extends any[] = []
> = {
  matched: MaybeIterable
  union: Depth extends DepthStack['length'] | infer Rest ? Rest extends number ?
      AsyncFlatReturnElement<DepthStack['length'], MaybeIterable> |
      AsyncFlatReturnElement<Rest, MaybeIterable>
    : never : never
  unmatched: MaybeIterable extends Iterable<infer Next>
    ? AsyncFlatReturnElement<Depth, Next, Prepend<DepthStack, any>>
    : MaybeIterable
}[
  DepthStack['length'] extends Depth
    ? Depth extends DepthStack['length']
      ? 'matched'
      : 'union'
    : 'unmatched'
]

type AsyncFlatReturn<
  Depth extends ReasonableNumber,
  Iter extends AsyncIterableLike<any>
> = AsyncIterableIterator<AsyncFlatReturnElement<
  Depth,
  AsyncIterableElement<Iter>
>>

/**
 * Functions of type `MergePickFunc` is
 * to be used as `pickFunc` parameter of `merge()`.
 *
 * This function decides what sequence to use.
 *
 * @param items An array of iterators corresponding to respective iterables passed to `merge()`.
 * @return Index of chosen sequence.
 */
export interface MergePickFunc<Value> {
  (items: ReadonlyArray<IteratorResult<Value> | null>): number
}

/**
 * Functions of type `AsyncMergePickFunc` is
 * to be used as `pickFunc` parameter of `asyncMerge()`.
 *
 * This function decides what sequence to use.
 *
 * @param items An array of iterators corresponding to respective iterables passed to `asyncMerge()`.
 * @return Index of chosen sequence.
 */
export interface AsyncMergePickFunc<Value> {
  (items: ReadonlyArray<
    Promise<IteratorResult<Value> | null>
  >): number
}

export type SplitAtElement<
  Position extends number,
  Iter extends any[],
  First extends any[] = [],
  Rest extends any[] = []
> = {
  matched: [
    IterableElement<First>,
    IterableElement<Iter>
  ]
  unmatched: ((...args: Iter) => any) extends ((a: infer FirstAddend, ...b: infer NextRest) => any)
    ? SplitAtElement<
        Position,
        NextRest,
        Prepend<First, FirstAddend>,
        NextRest
      >
    : never
  outOfBound: [
    IterableElement<First>,
    never
  ]
}[
  First['length'] extends Position ? 'matched' :
  Iter extends [] ? 'outOfBound' :
  'unmatched'
]

export type SplitAtArrayReturn<Position extends number, Iter extends any[]> =
  SplitAtElement<Position, Iter> extends [infer A, infer B]
    ? [IterableIterator<A>, IterableIterator<B>]
    : never

export type AsyncSplitAtArrayReturn<Position extends number, Iter extends any[]> =
  SplitAtElement<Position, Iter> extends [infer A, infer B]
    ? [AsyncIterableIterator<A>, AsyncIterableIterator<B>]
    : never

// Sync
export declare function keys (obj: { [id: string]: any }): IterableIterator<string>
export declare function values<T> (obj: { [id: string]: T }): IterableIterator<T>
export declare function entries<T> (obj: { [id: string]: T }): IterableIterator<[string, T]>

export declare function batch<T> (n: number): (iterable: Iterable<T>) => IterableIterator<T[]>
export declare function batch<T> (n: number, iterable: Iterable<T>): IterableIterator<T[]>

export declare function chain<T> (...iterables: Array<Iterable<T>>): IterableIterator<T>
export declare function concat<T> (...iterables: Array<Iterable<T>>): IterableIterator<T>

export declare const combinations: CombinationsPermutations
export declare const combinationsWithReplacement: CombinationsPermutations

export declare function compose<T> (...fns: ((x: T) => T)[]): (x: T) => T

export declare function compress<T> (iterable: Iterable<T>, compress: Iterable<boolean>): IterableIterator<T>

export declare function consume<T> (func: (item: T) => void): (iterable: Iterable<T>) => void
export declare function consume<T> (func: (item: T) => void, iterable: Iterable<T>): void

export declare function count (opts: number | { start: number, end?: number, step?: number }): IterableIterator<number>

export declare function cycle<Iter extends Iterable<any>> (iterable: Iter):
  Iter extends any[] ? IterableIterator<UnionFromTuple<Iter>> : ToIterator<Iter>

export declare function cursor<T, Size extends ReasonableNumber> (
  opts: {
    readonly size: Size
    readonly trailing?: boolean
    readonly filler?: undefined
  },
  iter: Iterable<T>
): IterableIterator<Repeat<T | undefined, Size>>
export declare function cursor<T, Size extends ReasonableNumber, Filler> (
  opts: {
    readonly size: Size
    readonly trailing?: boolean
    readonly filler: Filler
  },
  iter: Iterable<T>
): IterableIterator<Repeat<T | Filler, Size>>
export declare function cursor<T> (
  opts: {
    readonly size: number
    readonly trailing?: boolean
    readonly filler?: undefined
  },
  iter: Iterable<T>
): IterableIterator<Array<T | undefined>>
export declare function cursor<T, Filler> (
  opts: {
    readonly size: number
    readonly trailing?: boolean
    readonly filler: Filler
  },
  iter: Iterable<T>
): IterableIterator<Array<T | Filler>>

export declare function dropWhile<T> (func: (item: T) => boolean): (iterable: Iterable<T>) => IterableIterator<T>
export declare function dropWhile<T> (func: (item: T) => boolean, iterable: Iterable<T>): IterableIterator<T>

export declare function enumerate<T> (iterable: Iterable<T>, start?: number): IterableIterator<[number, T]>

export declare function execute<T, Args extends any[] = any[]> (
  func: (...args: Args) => T,
  ...args: Args
): IterableIterator<T>

export declare function every<T> (func: (item: T) => boolean): (iterable: Iterable<T>) => boolean
export declare function every<T> (func: (item: T) => boolean, iterable: Iterable<T>): boolean

export declare function filter<S extends T, T> (func: (item: T) => item is S): (iterable: Iterable<T>) => IterableIterator<S>
export declare function filter<S extends T, T> (func: (item: T) => item is S, iterable: Iterable<T>): IterableIterator<S>
export declare function filter<T> (func: (item: T) => boolean): (iterable: Iterable<T>) => IterableIterator<T>
export declare function filter<T> (func: (item: T) => boolean, iterable: Iterable<T>): IterableIterator<T>

export declare function find<S extends T, T> (func: (item: T) => item is S): (iterable: Iterable<T>) => S | undefined
export declare function find<S extends T, T> (func: (item: T) => item is S, iterable: Iterable<T>): S | undefined
export declare function find<T> (func: (item: T) => boolean): (iterable: Iterable<T>) => T | undefined
export declare function find<T> (func: (item: T) => boolean, iterable: Iterable<T>): T | undefined

export declare function first<Iter extends Iterable<any>> (iterable: Iter):
  Iter extends [] ? undefined :
  Iter extends [infer First, ...any[]] ? First :
  Iter extends Iterable<infer T> ? T | undefined :
  never

export declare function flat<
  Iter extends Iterable<any>
> (iter: Iter): FlatReturn<1, Iter>
export declare function flat<Depth extends ReasonableNumber> (depth: Depth):
  <Iter extends Iterable<any>> (iter: Iter) => FlatReturn<Depth, Iter>
export declare function flat (depth: number): (iter: Iterable<any>) => IterableIterator<any>
export declare function flat<
  Depth extends ReasonableNumber,
  Iter extends Iterable<any>
> (depth: Depth, iter: Iter): FlatReturn<Depth, Iter>
export declare function flat (depth: number, iter: Iterable<any>): IterableIterator<any>
export declare function flat (
  shouldFlat: (depth: number, iter: any) => boolean,
  iter: Iterable<any>
): IterableIterator<any>
export declare function flat (shouldFlat: (depth: number, iter: any) => boolean):
  (iter: Iterable<any>) => IterableIterator<any>

export declare function flatMap<T, O> (func: (item: T) => Iterable<O>):
  (iter: Iterable<T>) => IterableIterator<O>
export declare function flatMap<T, O> (
  func: (item: T) => Iterable<O>,
  iter: Iterable<T>
): IterableIterator<O>

export declare function groupBy (key: null):
  <T>(iterable: Iterable<T>) => IterableIterator<[T, IterableIterator<T>]>
export declare function groupBy<T> (
  key: null,
  iterable: Iterable<T>
): IterableIterator<[T, IterableIterator<T>]>
export declare function groupBy<T, K> (key: (item: T) => K):
  (iterable: Iterable<T>) => IterableIterator<[K, IterableIterator<T>]>
export declare function groupBy<T, K> (
  key: (item: T) => K,
  iterable: Iterable<T>
): IterableIterator<[K, IterableIterator<T>]>

export declare function interpose<T, I> (interposeItem: I): (iter: Iterable<T>) => IterableIterator<T | I>
export declare function interpose<T, I> (interposeItem: I, iter: Iterable<T>): IterableIterator<T | I>

export declare function iterable<T> (
  iterator: {
    readonly next: () => IteratorResult<T>
  } | Iterable<T>
): Iterable<T>

export declare function map<T, O> (func: (item: T) => O): (iter: Iterable<T>) => IterableIterator<O>
export declare function map<T, O> (func: (item: T) => O, iter: Iterable<T>): IterableIterator<O>

export declare function merge<T> (pickFunc: MergePickFunc<T>): (iterables: ReadonlyArray<Iterable<T>>) => IterableIterator<T>
export declare function merge<T> (pickFunc: MergePickFunc<T>, iterables: ReadonlyArray<Iterable<T>>): IterableIterator<T>

export declare function partition<T, S extends T> (
  func: (item: T) => item is S,
  iter: Iterable<T>
): [
  IterableIterator<S>,
  IterableIterator<SetComplement<T, S>>
]
export declare function partition<T, S extends T> (
  func: (item: T) => item is S
): (iter: Iterable<T>) => [
  IterableIterator<S>,
  IterableIterator<SetComplement<T, S>>
]
export declare function partition<T> (
  func: (item: T) => boolean,
  iter: Iterable<T>
): [IterableIterator<T>, IterableIterator<T>]
export declare function partition<T> (func: (item: T) => boolean):
  (iter: Iterable<T>) => [IterableIterator<T>, IterableIterator<T>]

export declare const permutations: CombinationsPermutations

export declare function pipeline<
  Args extends any[],
  T
> (
  init: (...args: Args) => T,
  ...fns: ((x: T) => T)[]
): (...args: Args) => T

export declare function product<Args extends Array<Iterable<any>>> (...iterables: Args):
  Iterable<ProductReturnElement<Args>> & { getSize: () => number }

export declare function range<R extends number> (r: R): RangeReturn<R>
export declare function range (opts: { start: number, end?: number, step?: number }): IterableIterator<number>
export declare function range (_?: undefined): IterableIterator<number>

export declare function reduce<T, O> (func: (acc: O, item: T, c: number) => O): (iterable: Iterable<T>) => O
export declare function reduce<T, O> (initial: O, func: (acc: O, item: T, c: number) => O):
    (iterable: Iterable<T>) => O
export declare function reduce<T, O> (func: (acc: O, item: T, c: number) => O, iterable: Iterable<T>): O
export declare function reduce<T, O> (initial: O, func: (acc: O, item: T, c: number) => O, iterable: Iterable<T>): O

export declare function regexpExec (re: RegExp): (str: string) => IterableIterator<string>
export declare function regexpExec (re: RegExp, str: string): IterableIterator<string>

export declare function regexpSplit (re: RegExp): (str: string) => IterableIterator<string>
export declare function regexpSplit (re: RegExp, str: string): IterableIterator<string>

export declare function regexpSplitIter (re: RegExp): (iterable: Iterable<string>) => IterableIterator<string>
export declare function regexpSplitIter (re: RegExp, iterable: Iterable<string>): IterableIterator<string>

export declare function regexpExecIter (re: RegExp): (iterable: Iterable<string>) => IterableIterator<string>
export declare function regexpExecIter (re: RegExp, iterable: Iterable<string>): IterableIterator<string>

export declare function splitAt<
  Position extends ReasonableNumber,
  Iter extends any[]
> (position: Position, iter: Iter): SplitAtArrayReturn<Position, Iter>
export declare function splitAt<
  Position extends ReasonableNumber
> (position: Position): {
  <Iter extends any[]> (iter: Iter): SplitAtArrayReturn<Position, Iter>
  <T> (iter: Iterable<T>): [IterableIterator<T>, IterableIterator<T>]
}
export declare function splitAt<T> (
  position: number,
  iterable: Iterable<T>
): [IterableIterator<T>, IterableIterator<T>]
export declare function splitAt (
  position: number
): <T> (iterable: Iterable<T>) => [IterableIterator<T>, IterableIterator<T>]

export declare function splitLines (iterable: Iterable<string>): IterableIterator<string>

export declare function repeat<T> (obj: T, times?: number): IterableIterator<T>

export declare function size<Iter extends Iterable<any>> (iterable: Iter):
  Iter extends any[] ? Iter['length'] : number

export declare function slice<T> (
    opts: number | { start: number, end?: number, step?: number },
    iterable: Iterable<T>
): IterableIterator<T>

export declare function some<T> (func: (item: T) => boolean): (iterable: Iterable<T>) => boolean
export declare function some<T> (func: (item: T) => boolean, iterable: Iterable<T>): boolean

export declare function takeWhile<T> (func: (item: T) => boolean): (iterable: Iterable<T>) => IterableIterator<T>
export declare function takeWhile<T> (func: (item: T) => boolean, iterable: Iterable<T>): IterableIterator<T>

export declare function tap<T> (func: (item: T, c: number) => any, iterable: Iterable<T>): IterableIterator<T>

export declare function takeSorted<T> (
    n: number,
    func?: (item: T) => boolean
): (iterable: Iterable<T>) => IterableIterator<T>
export declare function takeSorted<T> (
    n: number,
    func?: (item: T) => boolean,
    iterable?: Iterable<T>
): IterableIterator<T>

export declare function tee<T> (iterable: Iterable<T>, n?: number): IterableIterator<IterableIterator<T>>

export declare function toArray<T> (iterable: Iterable<T>): T[]

export declare function zipLongest<T> (...iterables: Array<Iterable<T>>): IterableIterator<T[]>
export declare function zipAll<T> (...iterables: Array<Iterable<T>>): IterableIterator<T[]>
export declare function zip<T> (...iterables: Array<Iterable<T>>): IterableIterator<T[]>

/**
 * @deprecated Use `iterable` instead
 */
export declare function iter<T> (iterable: Iterable<T>): IterableIterator<T>

// Async
export declare function asyncBatch<T> (n: number): (iterable: AsyncIterableLike<T>) => AsyncIterableIterator<T>
export declare function asyncBatch<T> (n: number, iterable: AsyncIterableLike<T>): AsyncIterableIterator<T>

export declare function asyncChain<T> (...iterables: Array<AsyncIterableLike<T>>): AsyncIterableIterator<T>
export declare function asyncConcat<T> (...iterables: Array<AsyncIterableLike<T>>): AsyncIterableIterator<T>

export declare function asyncConsume<T> (func: (item: T) => MaybePromise<void>): (iterable: AsyncIterableLike<T>) => void
export declare function asyncConsume<T> (func: (item: T) => MaybePromise<void>, iterable: AsyncIterableLike<T>): void

export declare function asyncCompress<T> (
    iterable: AsyncIterableLike<T>,
    compress: AsyncIterableLike<boolean>
): AsyncIterableIterator<T>

export declare function asyncCycle<T> (iterable: AsyncIterableLike<T>): AsyncIterableIterator<T>

export declare function asyncCursor<T, Size extends ReasonableNumber> (
  opts: {
    readonly size: Size
    readonly trailing?: boolean
    readonly filler?: undefined
  },
  iter: Iterable<T>
): AsyncIterableIterator<Repeat<T | undefined, Size>>
export declare function asyncCursor<T, Size extends ReasonableNumber, Filler> (
  opts: {
    readonly size: Size
    readonly trailing?: boolean
    readonly filler: Filler
  },
  iter: Iterable<T>
): AsyncIterableIterator<Repeat<T | Filler, Size>>
export declare function asyncCursor<T> (
  opts: {
    readonly size: number
    readonly trailing?: boolean
    readonly filler?: undefined
  },
  iter: AsyncIterable<T>
): AsyncIterableIterator<Array<T | undefined>>
export declare function asyncCursor<T, Filler> (
  opts: {
    readonly size: number
    readonly trailing?: boolean
    readonly filler: Filler
  },
  iter: AsyncIterable<T>
): AsyncIterableIterator<Array<T | Filler>>

export declare function asyncDropWhile<T> (func: (item: T) => MaybePromise<boolean>):
    (iterable: AsyncIterableLike<T>) => AsyncIterableIterator<T>
export declare function asyncDropWhile<T> (
  func: (item: T) => MaybePromise<boolean>,
  iterable: AsyncIterableLike<T>
): AsyncIterableIterator<T>

export declare function asyncEnumerate<T> (iterable: AsyncIterableLike<T>, start?: number):
    AsyncIterableIterator<[number, T]>

export declare function asyncEvery<T> (func: (item: T) => MaybePromise<boolean>):
  (iterable: AsyncIterableLike<T>) => Promise<boolean>
export declare function asyncEvery<T> (
  func: (item: T) => MaybePromise<boolean>,
  iterable: AsyncIterableLike<T>
): Promise<boolean>

export declare function asyncExecute<T, Args extends any[] = any[]> (
  func: (...args: Args) => Promise<T>,
  ...args: Args
): AsyncIterableIterator<T>

export declare function asyncFilter<S extends T, T> (func: (item: T) => item is S):
  (iterable: AsyncIterableLike<T>) => AsyncIterableIterator<S>
export declare function asyncFilter<S extends T, T> (
  func: (item: T) => item is S,
  iterable: AsyncIterableLike<T>
): AsyncIterableIterator<S>
export declare function asyncFilter<T> (func: (item: T) => MaybePromise<boolean>):
  (iterable: AsyncIterableLike<T>) => AsyncIterableIterator<T>
export declare function asyncFilter<T> (
  func: (item: T) => MaybePromise<boolean>,
  iterable: AsyncIterableLike<T>
): AsyncIterableIterator<T>
export declare function asyncFilter<S extends T, T> (concurrency: number, func: (item: T) => item is S):
  (iterable: AsyncIterableLike<T>) => AsyncIterableIterator<S>
export declare function asyncFilter<S extends T, T> (
  concurrency: number,
  func: (item: T) => item is S,
  iterable: AsyncIterableLike<T>
): AsyncIterableIterator<S>
export declare function asyncFilter<T> (concurrency: number, func: (item: T) => MaybePromise<boolean>):
  (iterable: AsyncIterableLike<T>) => AsyncIterableIterator<T>
export declare function asyncFilter<T> (
  concurrency: number,
  func: (item: T) => MaybePromise<boolean>,
  iterable: AsyncIterableLike<T>
): AsyncIterableIterator<T>

export declare function asyncFind<S extends T, T> (func: (item: T) => item is S):
  (iterable: AsyncIterableLike<T>) => Promise<S | null>
export declare function asyncFind<S extends T, T> (
  func: (item: T) => item is S,
  iterable: AsyncIterableLike<T>
): Promise<S | undefined>
export declare function asyncFind<T> (func: (item: T) => MaybePromise<boolean>):
  (iterable: AsyncIterableLike<T>) => Promise<T | null>
export declare function asyncFind<T> (
  func: (item: T) => MaybePromise<boolean>,
  iterable: AsyncIterableLike<T>
): Promise<T | undefined>

export declare function asyncFirst<T> (iterable: AsyncIterableLike<T>): T | undefined

export declare function asyncFlat<
  Iter extends AsyncIterableLike<any>
> (iter: Iter): AsyncFlatReturn<1, Iter>
export declare function asyncFlat<Depth extends ReasonableNumber> (depth: Depth):
  <Iter extends AsyncIterableLike<any>> (iter: Iter) => AsyncFlatReturn<Depth, Iter>
export declare function asyncFlat (depth: number): (iter: AsyncIterableLike<any>) => AsyncIterableIterator<any>
export declare function asyncFlat<
  Depth extends ReasonableNumber,
  Iter extends AsyncIterableLike<any>
> (depth: Depth, iter: Iter): AsyncFlatReturn<Depth, Iter>
export declare function asyncFlat (depth: number, iter: AsyncIterableLike<any>): AsyncIterableIterator<any>
export declare function asyncFlat (
  shouldFlat: (depth: number, iter: any) => MaybePromise<boolean>,
  iter: AsyncIterableLike<any>
): AsyncIterableIterator<any>
export declare function asyncFlat (shouldFlat: (depth: number, iter: any) => MaybePromise<boolean>):
  (iter: AsyncIterable<any>) => AsyncIterableIterator<any>

export declare function asyncFlatMap<T, O> (func: (item: T) => AsyncIterableLike<O>):
    (iter: AsyncIterableLike<T>) => AsyncIterableIterator<O>
export declare function asyncFlatMap<T, O> (func: (item: T) => AsyncIterableLike<O>, iter: AsyncIterableLike<T>):
    AsyncIterableIterator<O>

export declare function asyncGroupBy (key: null):
  <T>(iterable: AsyncIterableLike<T>) => AsyncIterableIterator<[T, AsyncIterableIterator<T>]>
export declare function asyncGroupBy<T> (
  key: null,
  iterable: AsyncIterableLike<T>
): AsyncIterableIterator<[T, AsyncIterableIterator<T>]>
export declare function asyncGroupBy<T, K> (key: (item: T) => MaybePromise<K>):
  (iterable: AsyncIterableLike<T>) => AsyncIterableIterator<[K, AsyncIterableIterator<T>]>
export declare function asyncGroupBy<T, K> (
  key: (item: T) => MaybePromise<K>,
  iterable: AsyncIterableLike<T>
): AsyncIterableIterator<[K, AsyncIterableIterator<T>]>

export declare function asyncInterpose<T, I> (interposeItem: I): (iter: AsyncIterableLike<T>) => AsyncIterableIterator<T | I>
export declare function asyncInterpose<T, I> (interposeItem: I, iter: AsyncIterableLike<T>): AsyncIterableIterator<T | I>

export declare function asyncIterable<T> (
  asyncIterator: {
    readonly next: () => Promise<IteratorResult<T>>
  } | AsyncIterableLike<T>
): AsyncIterable<T>

export declare function asyncMap<T, O> (func: (item: T) => MaybePromise<O>):
  (iter: AsyncIterableLike<T>) => AsyncIterableIterator<O>
export declare function asyncMap<T, O> (
  func: (item: T) => MaybePromise<O>,
  iter: AsyncIterableLike<T>
): AsyncIterableIterator<O>
export declare function asyncMap<T, O> (concurrency: number, func: (item: T) => MaybePromise<O>):
  (iter: AsyncIterableLike<T>) => AsyncIterableIterator<O>
export declare function asyncMap<T, O> (
  concurrency: number,
  func: (item: T) => MaybePromise<O>,
  iter: AsyncIterableLike<T>
): AsyncIterableIterator<O>

export declare function asyncMerge<T> (pickFunc: AsyncMergePickFunc<T>): (iterables: ReadonlyArray<AsyncIterableLike<T>>) => AsyncIterableIterator<T>
export declare function asyncMerge<T> (pickFunc: AsyncMergePickFunc<T>, iterables: ReadonlyArray<AsyncIterableLike<T>>): AsyncIterableIterator<T>

export declare function asyncReduce<T, O> (func: (acc: O, item: T, c: number) => O):
  (iterable: AsyncIterableLike<T>) => Promise<O>
export declare function asyncReduce<T, O> (
  initial: O,
  func: (acc: O, item: T, c: number) => MaybePromise<O>
): (iterable: AsyncIterableLike<T>) => Promise<O>
export declare function asyncReduce<T, O> (
  func: (acc: O, item: T, c: number) => MaybePromise<O>,
  iterable: AsyncIterableLike<T>
): Promise<O>
export declare function asyncReduce<T, O> (
    initial: O,
    func: (acc: O, item: T, c: number) => MaybePromise<O>,
    iterable: AsyncIterableLike<T>
): Promise<O>

export declare function asyncSize (iterable: AsyncIterable<any>): number

export declare function asyncSlice<T> (
    opts: number | { start: number, end?: number, step?: number },
    iterable: AsyncIterableLike<T>
): AsyncIterableIterator<T>

export declare function asyncTakeWhile<T> (func: (item: T) => MaybePromise<boolean>):
  (iterable: AsyncIterableLike<T>) => AsyncIterableIterator<T>
export declare function asyncTakeWhile<T> (
  func: (item: T) => MaybePromise<boolean>,
  iterable: AsyncIterableLike<T>
): AsyncIterableIterator<T>

export declare function asyncTap<T> (
  func: (item: T, c: number) => MaybePromise<void>,
  iterable: AsyncIterableLike<T>
): AsyncIterableIterator<T>

export declare function asyncTakeSorted<T> (n: number, func?: (item: T) => boolean): (iterable: AsyncIterableLike<T>) => AsyncIterableLike<T>
export declare function asyncTakeSorted<T> (n: number, func?: (item: T) => boolean, iterable?: AsyncIterableLike<T>):
    AsyncIterableLike<T>

export declare function asyncTee<T> (iterable: AsyncIterableLike<T>, n?: number): IterableIterator<AsyncIterableIterator<T>>

export declare function asyncToArray<T> (iterable: AsyncIterableLike<T>): Promise<T[]>

export declare function asyncZipLongest<T> (...iterables: Array<AsyncIterableLike<T>>): AsyncIterableIterator<T[]>
export declare function asyncZipAll<T> (...iterables: Array<AsyncIterableLike<T>>): AsyncIterableIterator<T[]>

export declare function asyncZip<T> (...iterables: Array<AsyncIterableLike<T>>): AsyncIterableIterator<T[]>

export declare function asyncRegexpSplitIter (re: RegExp):
    (iterable: AsyncIterableLike<string>) => AsyncIterableLike<string>
export declare function asyncRegexpSplitIter (re: RegExp, iterable: AsyncIterableLike<string>):
    AsyncIterableLike<string>

export declare function asyncRegexpExecIter (re: RegExp):
    (iterable: AsyncIterableLike<string>) => AsyncIterableLike<string>
export declare function asyncRegexpExecIter (re: RegExp, iterable: AsyncIterableLike<string>):
    AsyncIterableLike<string>

export declare function asyncSplitAt<
  Position extends ReasonableNumber,
  Iter extends any[]
> (position: Position, iter: Iter): AsyncSplitAtArrayReturn<Position, Iter>
export declare function asyncSplitAt<
  Position extends ReasonableNumber
> (position: Position): {
  <Iter extends any[]> (iter: Iter): AsyncSplitAtArrayReturn<Position, Iter>
  <T> (iter: AsyncIterableLike<T>): [AsyncIterableIterator<T>, AsyncIterableIterator<T>]
}
export declare function asyncSplitAt<T> (
  position: number,
  iterable: AsyncIterableLike<T>
): [AsyncIterableIterator<T>, AsyncIterableIterator<T>]
export declare function asyncSplitAt (
  position: number
): <T> (iterable: AsyncIterableLike<T>) => [AsyncIterableIterator<T>, AsyncIterableIterator<T>]

export declare function asyncSplitLines (iterable: AsyncIterableLike<string>): AsyncIterableLike<string>

export declare function asyncSome<T> (func: (item: T) => MaybePromise<boolean>):
  (iterable: AsyncIterableLike<T>) => Promise<boolean>
export declare function asyncSome<T> (
  func: (item: T) => MaybePromise<boolean>,
  iterable: AsyncIterableLike<T>
): Promise<boolean>

export declare function asyncBuffer<T> (n: number): (iterable: AsyncIterableLike<T>) => AsyncIterableIterator<T>
export declare function asyncBuffer<T> (n: number, iterable: AsyncIterableLike<T>): AsyncIterableIterator<T>

export declare function asyncThrottle<T> (n: number): (iterable: AsyncIterableLike<T>) => AsyncIterableIterator<T>
export declare function asyncThrottle<T> (n: number, iterable: AsyncIterableLike<T>): AsyncIterableIterator<T>

// merge helpers
export declare function mergeByComparison<T> (comparator: (a: T, b: T) => number): MergePickFunc<T>
export declare function mergeByChance (weights: ReadonlyArray<number>): MergePickFunc<any>
export declare function mergeByPosition (step?: number): MergePickFunc<any>
export declare function asyncMergeByComparison<T> (comparator: (a: T, b: T) => number): AsyncMergePickFunc<T>
export declare function asyncMergeByChance (weights: ReadonlyArray<number>): AsyncMergePickFunc<any>
export declare function asyncMergeByPosition (step?: number): AsyncMergePickFunc<any>

/**
 * @deprecated Use `asyncIterable` instead
 */
export declare function asyncIter<T> (syncIterable: AsyncIterableLike<T>): AsyncIterableIterator<T>
