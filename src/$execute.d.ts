import { $IterableLike, $IterableIterator, $MaybePromise } from './internal/$iterable';

declare function $execute<T, Args extends any[] = any[]>(
  func: (...args: Args) => $MaybePromise<T>,
  ...args: Args
): $IterableIterator<T>;

export default $execute;
