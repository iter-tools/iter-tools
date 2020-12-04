declare function notAsyncIterable<T>(value: T | AsyncIterable<any>): value is T;

export { notAsyncIterable };
