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

// Sync
export declare function keys (obj: { [id: string]: any }): IterableIterator<string>
export declare function values<T> (obj: { [id: string]: T }): IterableIterator<T>
export declare function entries<T> (obj: { [id: string]: T }): IterableIterator<[string, T]>

export declare function apply<Args extends Array<any>, Return> (
  fn: (...args: Args) => Return,
  args: Args
): Return
export declare function apply<A, Return> (
  fn: (...args: Array<A>) => Return,
  args: Iterable<A>
): Return

export declare function call<Args extends Array<any>, Return> (
  fn: (...args: Args) => Return,
  ...args: Args
): Return

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

export declare function fork<T> (iterable: Iterable<T>): IterableIterator<IterableIterator<T>>

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

export declare function multiPartition<T> (
  func: (item: T) => number,
  iter: Iterable<T>
): IterableIterator<IterableIterator<T>>
export declare function multiPartition<T> (
  func: (item: T) => number
): (iter: Iterable<T>) => IterableIterator<IterableIterator<T>>

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

export declare function pipe<T> (...fns: ((x: T) => T)[]): (x: T) => T

export declare function pipeline<T0> (value: T0): T0
export declare function pipeline<T0, T1> (
  value: T0,
  fn0: (value: T0) => T1
): T1
export declare function pipeline<T0, T1, T2> (
  value: T0,
  fn0: (value: T0) => T1,
  fn1: (value: T1) => T2
): T2
export declare function pipeline<T0, T1, T2, T3> (
  value: T0,
  fn0: (value: T0) => T1,
  fn1: (value: T1) => T2,
  fn2: (value: T2) => T3
): T3
export declare function pipeline<T0, T1, T2, T3, T4> (
  value: T0,
  fn0: (value: T0) => T1,
  fn1: (value: T1) => T2,
  fn2: (value: T2) => T3,
  fn3: (value: T3) => T4
): T4
export declare function pipeline<T0, T1, T2, T3, T4, T5> (
  value: T0,
  fn0: (value: T0) => T1,
  fn1: (value: T1) => T2,
  fn2: (value: T2) => T3,
  fn3: (value: T3) => T4,
  fn4: (value: T4) => T5
): T5
export declare function pipeline<T0, T1, T2, T3, T4, T5, T6> (
  value: T0,
  fn0: (value: T0) => T1,
  fn1: (value: T1) => T2,
  fn2: (value: T2) => T3,
  fn3: (value: T3) => T4,
  fn4: (value: T4) => T5,
  fn5: (value: T5) => T6
): T6
export declare function pipeline<T0, T1, T2, T3, T4, T5, R> (
  value: T0,
  fn0: (value: T0) => T1,
  fn1: (value: T1) => T2,
  fn2: (value: T2) => T3,
  fn3: (value: T3) => T4,
  fn4: (value: T4) => T5,
  fn5: (value: T5) => R,
  ...restFns: Array<(value: R) => R>
): R

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

export declare function splitLines (iterable: Iterable<string>): IterableIterator<string>

export declare function repeat<T> (obj: T, times?: number): IterableIterator<T>

export declare function size<Iter extends Iterable<any>> (iterable: Iter):
  Iter extends any[] ? Iter['length'] : number

export declare function slice<T> (
  opts: number | {
    readonly start?: number
    readonly end?: number
    readonly step?: number
  },
  iterable: Iterable<T>
): IterableIterator<T>

export declare function some<T> (func: (item: T) => boolean): (iterable: Iterable<T>) => boolean
export declare function some<T> (func: (item: T) => boolean, iterable: Iterable<T>): boolean

export declare function splitAt (position: number):
  <T> (iterable: Iterable<T>) => IterableIterator<IterableIterator<T>>
export declare function splitAt<T> (
  position: number,
  iterable: Iterable<T>
): IterableIterator<IterableIterator<T>>

export declare function takeWhile<T> (func: (item: T) => boolean): (iterable: Iterable<T>) => IterableIterator<T>
export declare function takeWhile<T> (func: (item: T) => boolean, iterable: Iterable<T>): IterableIterator<T>

export declare function tap<T> (func: (item: T, c: number) => any, iterable: Iterable<T>): IterableIterator<T>

export declare function takeSorted<T> (
    func: (item: T) => boolean,
    n: number
): (iterable: Iterable<T>) => IterableIterator<T>

export declare function takeSorted<T> (
    func: (item: T) => boolean,
    n: number,
    iterable?: Iterable<T>
): IterableIterator<T>

export declare function takeSorted<T> (
    n: number
): (iterable: Iterable<T>) => IterableIterator<T>

export declare function takeSorted<T> (
    n: number,
    iterable?: Iterable<T>
): IterableIterator<T>

/**
 * @deprecated Use `fork` instead
 */
export declare function tee<T> (iterable: Iterable<T>, n?: number): IterableIterator<IterableIterator<T>>

export declare function toArray<T> (iterable: Iterable<T>): T[]

export declare function zipLongest<T> (...iterables: Array<Iterable<T>>): IterableIterator<T[]>
export declare function zipAll<T> (...iterables: Array<Iterable<T>>): IterableIterator<T[]>
export declare function zip<T> (...iterables: Array<Iterable<T>>): IterableIterator<T[]>

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

export declare function asyncFlatMap<T, O> (func: (item: T) => MaybePromise<AsyncIterableLike<O>>):
    (iter: AsyncIterableLike<T>) => AsyncIterableIterator<O>
export declare function asyncFlatMap<T, O> (func: (item: T) => MaybePromise<AsyncIterableLike<O>>, iter: AsyncIterableLike<T>):
    AsyncIterableIterator<O>
export declare function asyncFlatMap<T, O> (concurrency: number, func: (item: T) => MaybePromise<AsyncIterableLike<O>>):
    (iter: AsyncIterableLike<T>) => AsyncIterableIterator<O>
export declare function asyncFlatMap<T, O> (concurrency: number, func: (item: T) => MaybePromise<AsyncIterableLike<O>>, iter: AsyncIterableLike<T>):
    AsyncIterableIterator<O>

export declare function asyncFork<T> (asyncIterable: AsyncIterableLike<T>): IterableIterator<AsyncIterableIterator<T>>

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

export declare function asyncMultiPartition<T> (
  func: (item: T) => number,
  iter: AsyncIterableIterator<T>
): IterableIterator<AsyncIterableIterator<T>>
export declare function asyncMultiPartition<T> (
  func: (item: T) => number
): (iter: AsyncIterableIterator<T>) => IterableIterator<AsyncIterableIterator<T>>

export declare function asyncPartition<T, S extends T> (
  func: (item: T) => item is S,
  iter: AsyncIterableIterator<T>
): [
  AsyncIterableIterator<S>,
  AsyncIterableIterator<SetComplement<T, S>>
]
export declare function asyncPartition<T, S extends T> (
  func: (item: T) => item is S
): (iter: AsyncIterableIterator<T>) => [
  AsyncIterableIterator<S>,
  AsyncIterableIterator<SetComplement<T, S>>
]
export declare function asyncPartition<T> (
  func: (item: T) => MaybePromise<boolean>,
  iter: Iterable<T>
): [AsyncIterableIterator<T>, AsyncIterableIterator<T>]
export declare function asyncPartition<T> (func: (item: T) => MaybePromise<boolean>):
  (iter: Iterable<T>) => [AsyncIterableIterator<T>, AsyncIterableIterator<T>]

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
  opts: number | {
    readonly start?: number
    readonly end?: number
    readonly step?: number
  },
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

export declare function asyncTakeSorted<T> (func: (item: T) => boolean, n: number): (iterable: AsyncIterableLike<T>) => AsyncIterableLike<T>
export declare function asyncTakeSorted<T> (func: (item: T) => boolean, n: number, iterable?: AsyncIterableLike<T>):
    AsyncIterableLike<T>
export declare function asyncTakeSorted<T> (n: number): (iterable: AsyncIterableLike<T>) => AsyncIterableLike<T>
export declare function asyncTakeSorted<T> (n: number, iterable?: AsyncIterableLike<T>):
    AsyncIterableLike<T>

/**
 * @deprecated Use `asyncFork` instead
 */
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

export declare function asyncSplitLines (iterable: AsyncIterableLike<string>): AsyncIterableLike<string>

export declare function asyncSome<T> (func: (item: T) => MaybePromise<boolean>):
  (iterable: AsyncIterableLike<T>) => Promise<boolean>
export declare function asyncSome<T> (
  func: (item: T) => MaybePromise<boolean>,
  iterable: AsyncIterableLike<T>
): Promise<boolean>

export declare function asyncSplitAt (position: number):
  <T> (iterable: AsyncIterableLike<T>) => IterableIterator<AsyncIterableIterator<T>>
export declare function asyncSplitAt<T> (
  position: number,
  iterable: AsyncIterableLike<T>
): IterableIterator<AsyncIterableIterator<T>>

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
