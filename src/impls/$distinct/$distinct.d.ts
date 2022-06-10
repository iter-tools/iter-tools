import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $distinct<T>(source: $Wrappable<T>): $IterableIterator<T>;

declare function $distinct<T>(
  selector: (item: T) => unknown,
): (source: $Wrappable<T>) => $IterableIterator<T>;

declare function $distinct<T>(
  selector: (item: T) => unknown,
  source: $Wrappable<T>,
): $IterableIterator<T>;

export { $distinct };
