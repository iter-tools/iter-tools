import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $enumerate<T>(iterable: $Wrappable<T>): $IterableIterator<[number, T]>;

declare function $enumerate<T>(
  firstIdx: number,
  source: $Wrappable<T>,
): $IterableIterator<[number, T]>;

declare function $enumerate(
  firstIdx: number,
): <T>(source: $Wrappable<T>) => $IterableIterator<[number, T]>;

export { $enumerate };
