// eslint-disable-next-line spaced-comment
/// <reference lib="esnext.asynciterable" />

type UnwrapPromise<T> = T extends PromiseLike<infer U> ? U : T;

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

export interface AsyncIterableIterator<T, Unwrapped = UnwrapPromise<T>>
  extends AsyncIterator<Unwrapped> {
  [Symbol.asyncIterator](): SingletonAsyncIterableIterator<Unwrapped>;
}

export type AsyncPartsIterable<T> = AsyncIterableIterator<SingletonAsyncIterableIterator<T>>;

export type MaybePromise<T> = Promise<T> | T;
