import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $splitOnAny(
  separatorValues: Array<any>,
): <T>(source: $Wrappable<T>) => $IterableIterator<$IterableIterator<T>>;

declare function $splitOnAny<T>(
  separatorValues: Array<any>,
  source: $Wrappable<T>,
): $IterableIterator<$IterableIterator<T>>;

export { $splitOnAny };
