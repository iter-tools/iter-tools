export type AsyncDefinedInputIterable<T> = AsyncIterable<T> | Iterable<T>;
export type AsyncInputIterable<T> = null | undefined | AsyncDefinedInputIterable<T>;

type _AsyncIterable<T> = AsyncIterable<T>;
export { _AsyncIterable as AsyncIterable };

export interface AsyncGeneratorIterator<T> {
  next(value?: any): Promise<IteratorResult<T>>;
  return(value?: any): Promise<IteratorResult<T>>;
  throw(e?: any): Promise<IteratorResult<T>>;
  [Symbol.asyncIterator](): this;
}

export type AsyncIterableElement<Iter> = Iter extends AsyncInputIterable<infer X> ? X : never;

export type AsyncPromise<T> = Promise<T>;

export type AsyncMaybePromise<T> = T | Promise<T>;
