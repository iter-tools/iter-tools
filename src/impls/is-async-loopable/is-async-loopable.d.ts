declare function isAsyncLoopable(value: any): value is Iterable<unknown> | AsyncIterable<unknown>;

export default isAsyncLoopable;
