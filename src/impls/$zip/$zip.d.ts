import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $zip<T, U>(
  source1: $Wrappable<T>,
  source2: $Wrappable<U>,
): $IterableIterator<[T, U]>;
declare function $zip<T, U, V>(
  source1: $Wrappable<T>,
  source2: $Wrappable<U>,
  source3: $Wrappable<V>,
): $IterableIterator<[T, U, V]>;
declare function $zip<T>(...sources: Array<$Wrappable<T>>): $IterableIterator<T[]>;

export { $zip };
