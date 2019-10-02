export type AsyncDefinedSourceIterable<T> = AsyncIterable<T> | Iterable<T>;
export type AsyncSourceIterable<T> = null | undefined | AsyncDefinedSourceIterable<T>;

type _AsyncIterable<T> = AsyncIterable<T>;
export { _AsyncIterable as AsyncIterable };

export interface AsyncResultIterable<T> {
  next(value?: any): Promise<IteratorResult<T>>;
  return(value?: any): Promise<IteratorResult<T>>;
  throw(e?: any): Promise<IteratorResult<T>>;
  [Symbol.asyncIterator](): this;
}

export type AsyncIterableElement<Iter> = Iter extends AsyncSourceIterable<infer X> ? X : never;

export type MaybePromise<T> = Promise<T> | T;
