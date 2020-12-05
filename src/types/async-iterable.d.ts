// eslint-disable-next-line spaced-comment
/// <reference lib="esnext.asynciterable" />

export type AsyncDefinedSourceIterable<T> = AsyncIterable<T> | Iterable<T>;
export type AsyncSourceIterable<T> = null | undefined | AsyncDefinedSourceIterable<T>;

type _AsyncIterable<T> = AsyncIterable<T>;
export { _AsyncIterable as AsyncIterable };

export type AsyncIteratorResult<T> = Promise<IteratorResult<T>>;

export interface AsyncResultIterable<T> {
  next(value?: any): AsyncIteratorResult<T>;
  return(value?: any): AsyncIteratorResult<T>;
  throw(e?: any): AsyncIteratorResult<T>;
  [Symbol.asyncIterator](): this;
}

export type AsyncIterableElement<Iter> = Iter extends AsyncSourceIterable<infer X> ? X : never;

export type MaybePromise<T> = Promise<T> | T;
