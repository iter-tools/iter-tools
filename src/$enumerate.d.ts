import { $IterableLike, $IterableIterator } from './internal/$iterable';

declare function $enumerate<T = any>(
  iterable: $IterableLike<T>,
  start?: number,
): $IterableIterator<[number, T]>;

export default $enumerate;
