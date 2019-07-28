export type DefinedInputIterable<T> = Iterable<T>;
export type InputIterable<T> = DefinedInputIterable<T> | null | undefined;

type _Iterable<T> = Iterable<T>;
export { _Iterable as Iterable };

export interface GeneratorIterator<T> {
  next(value?: any): IteratorResult<T>;
  return(value?: any): IteratorResult<T>;
  throw(e?: any): IteratorResult<T>;
  [Symbol.iterator](): this;
}

export type IterableElement<Iter> = Iter extends Iterable<infer X> ? X : never;

export type Promise<T> = T;

export type MaybePromise<T> = T;
