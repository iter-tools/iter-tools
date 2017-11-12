type IterableLike<T> = Iterable<T> | T[] | { [key: string]: T; } | { [key: number]: T; };

export declare function chain<T>(...iterables: IterableLike<T>[]): Iterable<T>;

export declare function combinations<T>(iterable: IterableLike<T>, r: number): Iterable<T>;

export declare function combinationsWithReplacement<T>(iterable: IterableLike<T>, r: number): Iterable<T>;

export declare function compress<T>(iterable: IterableLike<T>, compress: IterableLike<boolean>): Iterable<T>;

export declare function count(opts: number | { start: number, end?: number, step?: number }): Iterable<number>;

export declare function cycle<T>(iterable: IterableLike<T>): Iterable<T>;

export declare function dropWhile<T>(func: (item: T) => boolean, iterable: IterableLike<T>): Iterable<T>;

export declare function enumerate<T>(iterable: IterableLike<T>, start?: number): Iterable<[number, T]>;

export declare function execute<T>(func: (...args: any[]) => T, ...args: any[]): Iterable<T>;

export declare function filter<T>(func: (item: T) => boolean, iterable: IterableLike<T>): Iterable<T>;

export declare function flatMap<T, O>(func: (item: T) => IterableLike<O>): (iter: IterableLike<T>) => Iterable<O>;
export declare function flatMap<T, O>(func: (item: T) => IterableLike<O>, iter: IterableLike<T>): Iterable<O>;

export declare function groupBy<T, K>(iterable: IterableLike<T>, key?: (item: T) => K): Iterable<[K, Iterable<T>]>;

export declare function iter<T>(iterable: IterableLike<T>): Iterable<T>;

export declare function map<T, O>(func: (item: T) => O): (iter: IterableLike<T>) => Iterable<O>;
export declare function map<T, O>(func: (item: T) => O, iter: IterableLike<T>): Iterable<O>;

export declare function permutations<T>(iterable: IterableLike<T>, r: number): Iterable<T>;

export declare function product<T, T2>(iterable1: IterableLike<T>[], iterable2: IterableLike<T2>[]): Iterable<[T, T2]>;
export declare function product<T, T2, T3>(iterable1: IterableLike<T>[], iterable2: IterableLike<T2>[], iterable3: IterableLike<T3>[]): Iterable<[T, T2, T3]>;
export declare function product<T, T2, T3, T4>(iterable1: IterableLike<T>[], iterable2: IterableLike<T2>[], iterable3: IterableLike<T3>[], iterable4: IterableLike<T4>[]): Iterable<[T, T2, T3, T4]>;
export declare function product<T, T2, T3, T4, T5>(iterable1: IterableLike<T>[], iterable2: IterableLike<T2>[], iterable3: IterableLike<T3>[], iterable4: IterableLike<T4>[], iterable5: IterableLike<T5>[]): Iterable<[T, T2, T3, T4, T5]>;
export declare function product<T, T2, T3, T4, T5, T6>(iterable1: IterableLike<T>[], iterable2: IterableLike<T2>[], iterable3: IterableLike<T3>[], iterable4: IterableLike<T4>[], iterable5: IterableLike<T5>[], iterable6: IterableLike<T6>[]): Iterable<[T, T2, T3, T4, T5, T6]>;
export declare function product<T>(...iterables: IterableLike<T>[]): Iterable<[T]>;

export declare function range(opts: number | { start: number, end?: number, step?: number }): Iterable<number>;

export declare function reduce<T, O>(iterable: IterableLike<T>, cb: (acc: O, item: T, c: number) => O, acc?: O): O;

export declare function reduceIter<T, O>(cb: (acc: O, item: T, c: number) => O, acc?: O): (iterable: IterableLike<T>) => Iterable<O>;
export declare function reduceIter<T, O>(cb: (acc: O, item: T, c: number) => O, acc: O, iterable: IterableLike<T>): Iterable<O>;

export declare function regexpExec(re: RegExp): (str: string) => Iterable<string>;
export declare function regexpExec(re: RegExp, str: string): Iterable<string>;

export declare function regexpSplit(re: RegExp): (str: string) => Iterable<string>;
export declare function regexpSplit(re: RegExp, str: string): Iterable<string>;

export declare function repeat<T>(obj: T, times?: number): Iterable<T>;

export declare function slice<T>(opts: number | { start: number, end?: number, step?: number }, iterable: IterableLike<T>): Iterable<number>;

export declare function takeWhile<T>(func: (item: T) => boolean, iterable: IterableLike<T>): Iterable<T>;

export declare function tee<T>(iterable: IterableLike<T>, number?: number): Iterable<T>[];

export declare function zip<T, T2>(iterable1: IterableLike<T>[], iterable2: IterableLike<T2>[]): Iterable<[T, T2]>;
export declare function zip<T, T2, T3>(iterable1: IterableLike<T>[], iterable2: IterableLike<T2>[], iterable3: IterableLike<T3>[]): Iterable<[T, T2, T3]>;
export declare function zip<T, T2, T3, T4>(iterable1: IterableLike<T>[], iterable2: IterableLike<T2>[], iterable3: IterableLike<T3>[], iterable4: IterableLike<T4>[]): Iterable<[T, T2, T3, T4]>;
export declare function zip<T, T2, T3, T4, T5>(iterable1: IterableLike<T>[], iterable2: IterableLike<T2>[], iterable3: IterableLike<T3>[], iterable4: IterableLike<T4>[], iterable5: IterableLike<T5>[]): Iterable<[T, T2, T3, T4, T5]>;
export declare function zip<T, T2, T3, T4, T5, T6>(iterable1: IterableLike<T>[], iterable2: IterableLike<T2>[], iterable3: IterableLike<T3>[], iterable4: IterableLike<T4>[], iterable5: IterableLike<T5>[], iterable6: IterableLike<T6>[]): Iterable<[T, T2, T3, T4, T5, T6]>;
export declare function zip<T>(...iterables: IterableLike<T>[]): Iterable<[T]>;

export declare function zipLongest<T>(filler: T, ...iterables: IterableLike<T>[]): Iterable<[T]>;