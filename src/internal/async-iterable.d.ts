export type AsyncDefinedIterableLike<T> = AsyncIterable<T> | Iterable<T>;
export type AsyncIterableLike<T> = null | undefined | AsyncDefinedIterableLike<T>;

type _AsyncIterable<T> = AsyncIterable<T>;
export { _AsyncIterable as AsyncIterable };

type _AsyncIterableIterator<T> = AsyncIterableIterator<T>;
export { _AsyncIterableIterator as AsyncIterableIterator };

export interface AsyncGeneratorIterator<T> {
  next(value?: any): Promise<IteratorResult<T>>;
  return(value?: any): Promise<IteratorResult<T>>;
  throw(e?: any): Promise<IteratorResult<T>>;
  [Symbol.asyncIterator](): this;
}

export type AsyncIterableElement<Iter> = Iter extends AsyncIterableLike<infer X> ? X : never;

export type AsyncPromise<T> = Promise<T>;

export type AsyncMaybePromise<T> = T | Promise<T>;
