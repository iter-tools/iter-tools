declare function notAsyncLoopable<T>(value: T | AsyncIterable<any> | Iterable<any>): value is T;

export { notAsyncLoopable };
