import {
  AsyncInputIterable,
  AsyncGeneratorIterator,
  AsyncMaybePromise,
} from '../../internal/async-iterable';

declare function asyncMapParallel<O, T = any>(
  func: (item: T, i: number) => AsyncMaybePromise<O>,
): (iterable: AsyncInputIterable<T>) => AsyncGeneratorIterator<O>;

declare function asyncMapParallel<O, T = any>(
  concurrency: number,
  func: (item: T, i: number) => AsyncMaybePromise<O>,
): (iterable: AsyncInputIterable<T>) => AsyncGeneratorIterator<O>;

declare function asyncMapParallel<O, T = any>(
  func: (item: T, i: number) => AsyncMaybePromise<O>,
  iterable: AsyncInputIterable<T>,
): AsyncGeneratorIterator<O>;

declare function asyncMapParallel<O, T = any>(
  concurrency: number,
  func: (item: T, i: number) => AsyncMaybePromise<O>,
  iterable: AsyncInputIterable<T>,
): AsyncGeneratorIterator<O>;

export default asyncMapParallel;
