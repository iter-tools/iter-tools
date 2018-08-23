type IterableLike<T> = Iterable<T> | T[] | { [key: string]: T; } | { [key: number]: T; };
type AsyncIterableIteratorLike<T> = AsyncIterableIterator<T> | IterableLike<T>;

// Sync
export declare function keys(iterable: any): Iterable<any>;
export declare function values(iterable: any): Iterable<any>;
export declare function entries(iterable: any): Iterable<any>;

export declare function batch<T>(number: number): (iterable: IterableLike<T>) => Iterable<Iterable<T>>;
export declare function batch<T>(number: number, iterable: IterableLike<T>): Iterable<Iterable<T>>;

export declare function chain<T>(...iterables: IterableLike<T>[]): Iterable<T>;
export declare function concat<T>(...iterables: IterableLike<T>[]): Iterable<T>;

export declare function combinations<T>(iterable: IterableLike<T>, r: number): Iterable<T>;

export declare function combinationsWithReplacement<T>(iterable: IterableLike<T>, r: number): Iterable<T>;

export declare function compose<T>(fns: IterableLike<T>): T;

export declare function compress<T>(iterable: IterableLike<T>, compress: IterableLike<boolean>): Iterable<T>;

export declare function consume<T>(func: (item: T) => void): (iterable: IterableLike<T>) => void;
export declare function consume<T>(func: (item: T) => void, iterable: IterableLike<T>): void;

export declare function count(opts: number | { start: number, end?: number, step?: number }): Iterable<number>;

export declare function cycle<T>(iterable: IterableLike<T>): Iterable<T>;

export declare function dropWhile<T>(func: (item: T) => boolean): (iterable: IterableLike<T>) => Iterable<T>;
export declare function dropWhile<T>(func: (item: T) => boolean, iterable: IterableLike<T>): Iterable<T>;

export declare function enumerate<T>(iterable: IterableLike<T>, start?: number): Iterable<[number, T]>;

export declare function execute<T>(func: (...args: any[]) => T, ...args: any[]): Iterable<T>;

export declare function every<T>(func: (item: T) => boolean): (iterable: IterableLike<T>) => boolean;
export declare function every<T>(func: (item: T) => boolean, iterable: IterableLike<T>): boolean;

export declare function filter<T>(func: (item: T) => boolean): (iterable: IterableLike<T>) => Iterable<T>;
export declare function filter<T>(func: (item: T) => boolean, iterable: IterableLike<T>): Iterable<T>;

export declare function find<T>(func: (item: T) => boolean): (iterable: IterableLike<T>) => T | null;
export declare function find<T>(func: (item: T) => boolean, iterable: IterableLike<T>): T | null;

export declare function first<T>(iterable: IterableLike<T>): T | undefined;

export declare function flatMap<T, O>(func: (item: T) => IterableLike<O>): (iter: IterableLike<T>) => Iterable<O>;
export declare function flatMap<T, O>(func: (item: T) => IterableLike<O>, iter: IterableLike<T>): Iterable<O>;

export declare function groupBy<T, K>(key: (item: T) => K): (iterable: IterableLike<T>) => Iterable<[K, Iterable<T>]>;
export declare function groupBy<T, K>(key: (item: T) => K, iterable: IterableLike<T>): Iterable<[K, Iterable<T>]>;

export declare function iterable<T>(iterator: { next: () => {value: T} }): Iterable<T>;
export declare function iterable<T>(iterable: IterableLike<T>): Iterable<T>;

export declare function map<T, O>(func: (item: T) => O): (iter: IterableLike<T>) => Iterable<O>;
export declare function map<T, O>(func: (item: T) => O, iter: IterableLike<T>): Iterable<O>;

export declare function permutations<T>(iterable: IterableLike<T>, r: number): Iterable<T>;

export declare function product<T>(...iterables: IterableLike<T>[]): Iterable<[T]>;
export declare function range(opts: number | { start: number, end?: number, step?: number }): Iterable<number>;

export declare function reduce<T, O>(func: (acc: O, item: T, c: number) => O): (iterable: IterableLike<T>) => O;
export declare function reduce<T, O>(initial: O, func: (acc: O, item: T, c: number) => O): (iterable: IterableLike<T>) => O;
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

export declare function size(iterable: Iterable<any>): number;

export declare function slice<T>(opts: number | { start: number, end?: number, step?: number }, iterable: IterableLike<T>): Iterable<number>;

export declare function some<T>(func: (item: T) => boolean): (iterable: IterableLike<T>) => boolean;
export declare function some<T>(func: (item: T) => boolean, iterable: IterableLike<T>): boolean;

export declare function takeWhile<T>(func: (item: T) => boolean): (iterable: IterableLike<T>) => Iterable<T>;
export declare function takeWhile<T>(func: (item: T) => boolean, iterable: IterableLike<T>): Iterable<T>;

export declare function tap<T>(func: (item: T, c: number) => any, iterable: IterableLike<T>): Iterable<T>;

export declare function takeSorted<T>(number: number, func?: (item: T) => boolean): (iterable: IterableLike<T>) => Iterable<T>;
export declare function takeSorted<T>(number: number, func?: (item: T) => boolean, iterable?: IterableLike<T>): Iterable<T>;

export declare function tee<T>(iterable: IterableLike<T>, number?: number): Iterable<T>[];

export declare function toArray<T>(iterable: IterableLike<T>): T[];

export declare function zipLongest<T>(...iterables: IterableLike<T>[]): Iterable<[T]>;
export declare function zipAll<T>(...iterables: IterableLike<T>[]): Iterable<[T]>;
export declare function zip<T>(...iterables: IterableLike<T>[]): Iterable<[T]>;

// Deprecated
export declare function iter<T>(iterable: IterableLike<T>): Iterable<T>;

// Async
export declare function asyncBatch<T>(number: number): (iterable: AsyncIterableIteratorLike<T>) => AsyncIterableIterator<T>;
export declare function asyncBatch<T>(number: number, iterable: AsyncIterableIteratorLike<T>): AsyncIterableIterator<T>;

export declare function asyncChain<T>(...iterables: AsyncIterableIteratorLike<T>[]): AsyncIterableIterator<T>;
export declare function asyncConcat<T>(...iterables: AsyncIterableIteratorLike<T>[]): AsyncIterableIterator<T>;

export declare function asyncConsume<T>(func: (item: T) => void): (iterable: AsyncIterableIteratorLike<T>) => void;
export declare function asyncConsume<T>(func: (item: T) => void, iterable: AsyncIterableIteratorLike<T>): void;

export declare function asyncCompress<T>(iterable: AsyncIterableIteratorLike<T>, compress: AsyncIterableIteratorLike<boolean>): AsyncIterableIterator<T>;

export declare function asyncCycle<T>(iterable: AsyncIterableIteratorLike<T>): AsyncIterableIterator<T>;

export declare function asyncDropWhile<T>(func: (item: T) => boolean): (iterable: AsyncIterableIteratorLike<T>) => AsyncIterableIterator<T>;
export declare function asyncDropWhile<T>(func: (item: T) => boolean, iterable: AsyncIterableIteratorLike<T>): AsyncIterableIterator<T>;

export declare function asyncEnumerate<T>(iterable: AsyncIterableIteratorLike<T>, start?: number): AsyncIterableIterator<[number, T]>;

export declare function asyncEvery<T>(func: (item: T) => boolean): (iterable: AsyncIterableIteratorLike<T>) => boolean;
export declare function asyncEvery<T>(func: (item: T) => boolean, iterable: AsyncIterableIteratorLike<T>): boolean;

export declare function asyncExecute<T>(func: (...args: any[]) => Promise<T>, ...args: any[]): AsyncIterableIterator<T>;

export declare function asyncFilter<T>(func: (item: T) => boolean): (iterable: AsyncIterableIteratorLike<T>) => AsyncIterableIterator<T>;
export declare function asyncFilter<T>(func: (item: T) => boolean, iterable: AsyncIterableIteratorLike<T>): AsyncIterableIterator<T>;

export declare function asyncFind<T>(func: (item: T) => boolean): (iterable: AsyncIterableIteratorLike<T>) => T | null;
export declare function asyncFind<T>(func: (item: T) => boolean, iterable: AsyncIterableIteratorLike<T>): T | null;

export declare function asyncFirst<T>(iterable: AsyncIterableIteratorLike<T>): T | undefined;

export declare function asyncFlatMap<T, O>(func: (item: T) => AsyncIterableIteratorLike<O>): (iter: AsyncIterableIteratorLike<T>) => AsyncIterableIterator<O>;
export declare function asyncFlatMap<T, O>(func: (item: T) => AsyncIterableIteratorLike<O>, iter: AsyncIterableIteratorLike<T>): AsyncIterableIterator<O>;

export declare function asyncGroupBy<T, K>(key: (item: T) => K): (iterable: AsyncIterableIteratorLike<T>) => Iterable<[K, Iterable<T>]>;
export declare function asyncGroupBy<T, K>(key: (item: T) => K, iterable: AsyncIterableIteratorLike<T>): Iterable<[K, Iterable<T>]>;

export declare function AsyncIterableIterator<T>(asyncIterator: { next: () => Promise<{value: T}> }): AsyncIterableIterator<T>;
export declare function AsyncIterableIterator<T>(syncIterable: AsyncIterableIteratorLike<T>): AsyncIterableIterator<T>;

export declare function asyncMap<T, O>(func: (item: T) => O): (iter: AsyncIterableIteratorLike<T>) => AsyncIterableIterator<O>;
export declare function asyncMap<T, O>(func: (item: T) => O, iter: AsyncIterableIteratorLike<T>): AsyncIterableIterator<O>;

export declare function asyncReduce<T, O>(func: (acc: O, item: T, c: number) => O): (iterable: AsyncIterableIteratorLike<T>) => O;
export declare function asyncReduce<T, O>(initial: O, func: (acc: O, item: T, c: number) => O): (iterable: AsyncIterableIteratorLike<T>) => O;
export declare function asyncReduce<T, O>(func: (acc: O, item: T, c: number) => O, iterable: AsyncIterableIteratorLike<T>): O;
export declare function asyncReduce<T, O>(initial: O, func: (acc: O, item: T, c: number) => O, iterable: AsyncIterableIteratorLike<T>): O;

export declare function asyncSize(iterable: AsyncIterableIterator<any>): number;

export declare function asyncSlice<T>(opts: number | { start: number, end?: number, step?: number }, iterable: AsyncIterableIteratorLike<T>): AsyncIterableIterator<number>;

export declare function asyncTakeWhile<T>(func: (item: T) => boolean): (iterable: AsyncIterableIteratorLike<T>) => AsyncIterableIterator<T>;
export declare function asyncTakeWhile<T>(func: (item: T) => boolean, iterable: AsyncIterableIteratorLike<T>): AsyncIterableIterator<T>;

export declare function asyncTap<T>(func: (item: T, c: number) => any, iterable: AsyncIterableIteratorLike<T>): AsyncIterableIterator<T>;

export declare function asyncTakeSorted<T>(number: number, func?: (item: T) => boolean): (iterable: AsyncIterableIteratorLike<T>) => AsyncIterableIteratorLike<T>;
export declare function asyncTakeSorted<T>(number: number, func?: (item: T) => boolean, iterable?: AsyncIterableIteratorLike<T>): AsyncIterableIteratorLike<T>;

export declare function asyncTee<T>(iterable: AsyncIterableIteratorLike<T>, number?: number): AsyncIterableIterator<T>[];

export declare function asyncToArray<T>(iterable: AsyncIterableIteratorLike<T>): T[];

export declare function asyncZipLongest<T>(...iterables: AsyncIterableIteratorLike<T>[]): AsyncIterableIterator<[T]>;
export declare function asyncZipAll<T>(...iterables: AsyncIterableIteratorLike<T>[]): AsyncIterableIterator<[T]>;

export declare function asyncZip<T>(...iterables: AsyncIterableIteratorLike<T>[]): AsyncIterableIterator<[T]>;

export declare function asyncRegexpSplitIter(re: RegExp): (iterable: AsyncIterableIteratorLike<string>) => AsyncIterableIteratorLike<string>;
export declare function asyncRegexpSplitIter(re: RegExp, iterable: AsyncIterableIteratorLike<string>): AsyncIterableIteratorLike<string>;

export declare function asyncRegexpExecIter(re: RegExp): (iterable: AsyncIterableIteratorLike<string>) => AsyncIterableIteratorLike<string>;
export declare function asyncRegexpExecIter(re: RegExp, iterable: AsyncIterableIteratorLike<string>): AsyncIterableIteratorLike<string>;

export declare function asyncSplitLines(iterable: AsyncIterableIteratorLike<string>): AsyncIterableIteratorLike<string>;

export declare function asyncSome<T>(func: (item: T) => boolean): (iterable: AsyncIterableIteratorLike<T>) => boolean;
export declare function asyncSome<T>(func: (item: T) => boolean, iterable: AsyncIterableIteratorLike<T>): boolean;

export declare function asyncThrottle<T>(number: number): (iterable: AsyncIterableIteratorLike<T>) => AsyncIterableIterator<T>;
export declare function asyncThrottle<T>(number: number, iterable: AsyncIterableIteratorLike<T>): AsyncIterableIterator<T>;

// Deprecated
export declare function asyncIter<T>(syncIterable: AsyncIterableIteratorLike<T>): AsyncIterableIterator<T>;
