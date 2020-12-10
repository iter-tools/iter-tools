import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $splitOn(
  same: (a: any, b: any) => boolean,
  separatorValue: any,
): <T>(source: $Wrappable<T>) => $IterableIterator<$IterableIterator<T>>;

declare function $splitOn<T>(
  same: (a: any, b: any) => boolean,
  separatorValue: any,
  source: $Wrappable<T>,
): $IterableIterator<$IterableIterator<T>>;

declare function $splitOn<T>(
  separatorValue: any,
  source: $Wrappable<T>,
): $IterableIterator<$IterableIterator<T>>;

export { $splitOn };
