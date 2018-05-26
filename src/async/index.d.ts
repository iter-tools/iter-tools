export declare function asyncIter<T>(syncIterable: AsyncIterableLike<T>): AsyncIterable<T>;

export declare function asyncIterToArray<T>(iterable: AsyncIterableLike<T>): T[];

export declare function asyncChain<T>(...iterables: AsyncIterableLike<T>[]): AsyncIterable<T>;

export declare function asyncCompress<T>(iterable: AsyncIterableLike<T>, compress: AsyncIterableLike<boolean>): AsyncIterable<T>;

export declare function asyncCycle<T>(iterable: AsyncIterableLike<T>): AsyncIterable<T>;

export declare function asyncDropWhile<T>(func: (item: T) => boolean): (iterable: AsyncIterableLike<T>) => AsyncIterable<T>;
export declare function asyncDropWhile<T>(func: (item: T) => boolean, iterable: AsyncIterableLike<T>): AsyncIterable<T>;

export declare function asyncEnumerate<T>(iterable: AsyncIterableLike<T>, start?: number): AsyncIterable<[number, T]>;

export declare function asyncExecute<T>(func: (...args: any[]) => Promise<T>, ...args: any[]): AsyncIterable<T>;

export declare function asyncFilter<T>(func: (item: T) => boolean): (iterable: AsyncIterableLike<T>) => AsyncIterable<T>;
export declare function asyncFilter<T>(func: (item: T) => boolean, iterable: AsyncIterableLike<T>): AsyncIterable<T>;

export declare function asyncFlatmap<T, O>(func: (item: T) => AsyncIterableLike<O>): (iter: AsyncIterableLike<T>) => AsyncIterable<O>;
export declare function asyncFlatmap<T, O>(func: (item: T) => AsyncIterableLike<O>, iter: AsyncIterableLike<T>): AsyncIterable<O>;

export declare function asyncGroupBy<T, K>(key: (item: T) => K): (iterable: AsyncIterableLike<T>) => Iterable<[K, Iterable<T>]>;
export declare function asyncGroupBy<T, K>(key: (item: T) => K, iterable: AsyncIterableLike<T>): Iterable<[K, Iterable<T>]>;

export declare function asyncMap<T, O>(func: (item: T) => O): (iter: AsyncIterableLike<T>) => AsyncIterable<O>;
export declare function asyncMap<T, O>(func: (item: T) => O, iter: AsyncIterableLike<T>): AsyncIterable<O>;

export declare function asyncReduceIter<T, O>(cb: (acc: O, item: T, c: number) => O, acc?: O): (iterable: AsyncIterableLike<T>) => AsyncIterable<O>;
export declare function asyncReduceIter<T, O>(cb: (acc: O, item: T, c: number) => O, acc: O, iterable: AsyncIterableLike<T>): AsyncIterable<O>;

export declare function asyncReduce<T, O>(func: (acc: O, item: T, c: number) => O): (iterable: AsyncIterableLike<T>) => O;
export declare function asyncReduce<T, O>(func: (acc: O, item: T, c: number) => O, iterable: AsyncIterableLike<T>): O;

export declare function asyncSlice<T>(opts: number | { start: number, end?: number, step?: number }, iterable: AsyncIterableLike<T>): AsyncIterable<number>;

export declare function asyncTakeWhile<T>(func: (item: T) => boolean): (iterable: AsyncIterableLike<T>) => AsyncIterable<T>;
export declare function asyncTakeWhile<T>(func: (item: T) => boolean, iterable: AsyncIterableLike<T>): AsyncIterable<T>;

export declare function asyncTee<T>(iterable: AsyncIterableLike<T>, number?: number): AsyncIterable<T>[];

export declare function asyncZipLongest<T>(filler: T, ...iterables: AsyncIterableLike<T>[]): AsyncIterable<[T]>;

export declare function asyncZip<T, T2>(iterable1: AsyncIterableLike<T>[], iterable2: AsyncIterableLike<T2>[]): AsyncIterable<[T, T2]>;
export declare function asyncZip<T, T2, T3>(iterable1: AsyncIterableLike<T>[], iterable2: AsyncIterableLike<T2>[], iterable3: AsyncIterableLike<T3>[]): AsyncIterable<[T, T2, T3]>;
export declare function asyncZip<T, T2, T3, T4>(iterable1: AsyncIterableLike<T>[], iterable2: AsyncIterableLike<T2>[], iterable3: AsyncIterableLike<T3>[], iterable4: AsyncIterableLike<T4>[]): AsyncIterable<[T, T2, T3, T4]>;
export declare function asyncZip<T, T2, T3, T4, T5>(iterable1: AsyncIterableLike<T>[], iterable2: AsyncIterableLike<T2>[], iterable3: AsyncIterableLike<T3>[], iterable4: AsyncIterableLike<T4>[], iterable5: AsyncIterableLike<T5>[]): AsyncIterable<[T, T2, T3, T4, T5]>;
export declare function asyncZip<T, T2, T3, T4, T5, T6>(iterable1: AsyncIterableLike<T>[], iterable2: AsyncIterableLike<T2>[], iterable3: AsyncIterableLike<T3>[], iterable4: AsyncIterableLike<T4>[], iterable5: AsyncIterableLike<T5>[], iterable6: AsyncIterableLike<T6>[]): AsyncIterable<[T, T2, T3, T4, T5, T6]>;
export declare function asyncZip<T>(...iterables: AsyncIterableLike<T>[]): AsyncIterable<[T]>;

export declare function asyncRegexpSplitIter(re: RegExp): (iterable: AsyncIterableLike<string>) => AsyncIterableLike<string>;
export declare function asyncRegexpSplitIter(re: RegExp, iterable: AsyncIterableLike<string>): AsyncIterableLike<string>;

export declare function asyncSplitLines(iterable: AsyncIterableLike<string>) => AsyncIterableLike<string>;
