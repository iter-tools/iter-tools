// eslint-disable-next-line spaced-comment
/// <reference lib="es2018" />

type _Iterable<T> = Iterable<T>;
export { _Iterable as Iterable };

export type Loopable<T> = Iterable<T>;
export type Wrappable<T> = Loopable<T> | null | undefined;

type _IteratorResult<T> = IteratorResult<T>;
export { _IteratorResult as IteratorResult };

interface Iterator<T> {
  next(value?: any): IteratorResult<T>;
  return(value?: any): IteratorResult<T>;
  throw(e?: any): IteratorResult<T>;
}

export interface NonIterableIterator<T> extends Iterator<T> {
  [Symbol.iterator]: never;
}

export interface SingletonIterableIterator<T> extends Iterator<T> {
  [Symbol.iterator](): NonIterableIterator<T>;
}

export interface IterableIterator<T> extends Iterator<T> {
  [Symbol.iterator](): SingletonIterableIterator<T>;
}

export type PartsIterable<T> = IterableIterator<SingletonIterableIterator<T>>;
