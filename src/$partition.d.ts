import { $IterableLike, $IterableIterator, $MaybePromise } from './internal/$iterable';
import { SetComplement } from 'utility-types';

declare function $partition<S extends T, T = any>(
  func: (item: T) => item is S,
  iterable: $IterableLike<T>,
): [$IterableIterator<S>, $IterableIterator<SetComplement<T, S>>];

declare function $partition<T = any>(
  func: (item: T) => $MaybePromise<boolean>,
  iterable: Iterable<T>,
): [$IterableIterator<T>, $IterableIterator<T>];

declare function $partition<S extends T, T = any>(
  func: (item: T) => item is S,
): (iterable: $IterableLike<T>) => [$IterableIterator<S>, $IterableIterator<SetComplement<T, S>>];

declare function $partition<T = any>(
  func: (item: T) => $MaybePromise<boolean>,
): (iterable: Iterable<T>) => [$IterableIterator<T>, $IterableIterator<T>];

export default $partition;
