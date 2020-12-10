import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $collate<T>(...sources: Array<$Wrappable<T>>): $IterableIterator<T>;

declare function $collate<T>(
  compare: (a: T, b: T) => number,
  ...sources: Array<$Wrappable<T>>
): $IterableIterator<T>;

declare function $collate<T>(
  compare: (a: T, b: T) => number,
): (...sources: Array<$Wrappable<T>>) => $IterableIterator<T>;

export { $collate };
