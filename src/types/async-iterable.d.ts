// eslint-disable-next-line spaced-comment
/// <reference lib="esnext.asynciterable" />

export type AsyncLoopable<T> = AsyncIterable<T> | Iterable<T> | Iterable<Promise<T>>;
export type AsyncWrappable<T> = null | undefined | AsyncLoopable<T>;

type _AsyncIterable<T> = AsyncIterable<T>;
export { _AsyncIterable as AsyncIterable };

export type AsyncIteratorResult<T> = Promise<IteratorResult<T>>;

export interface AsyncIterator<T> {
  next(value?: any): AsyncIteratorResult<T>;
  return(value?: any): AsyncIteratorResult<T>;
  throw(e?: any): AsyncIteratorResult<T>;
}

export interface NonIterableAsyncIterator<T> extends AsyncIterator<T> {
  [Symbol.asyncIterator]: never;
}
export type AsyncNonIterableIterator<T> = NonIterableAsyncIterator<T>;

export interface SingletonAsyncIterableIterator<T> extends AsyncIterator<T> {
  [Symbol.asyncIterator](): NonIterableAsyncIterator<T>;
}
export type AsyncSingletonIterableIterator<T> = SingletonAsyncIterableIterator<T>;

export interface AsyncIterableIterator<T> extends AsyncIterator<T> {
  [Symbol.asyncIterator](): SingletonAsyncIterableIterator<T>;
}

export type AsyncPartsIterable<T> = AsyncIterableIterator<SingletonAsyncIterableIterator<T>>;

export type MaybePromise<T> = Promise<T> | T;
