import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $splitOnAny(
  same: (a: any, b: any) => boolean,
  separatorValues: any,
): <T>(source: $Wrappable<T>) => $IterableIterator<$IterableIterator<T>>;

declare function $splitOnAny<T>(
  same: (a: any, b: any) => boolean,
  separatorValues: any,
  source: $Wrappable<T>,
): $IterableIterator<$IterableIterator<T>>;

declare function $splitOnAny<T>(
  separatorValues: any,
  source: $Wrappable<T>,
): $IterableIterator<$IterableIterator<T>>;

export { $splitOnAny };
