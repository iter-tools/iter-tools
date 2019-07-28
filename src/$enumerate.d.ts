import { $InputIterable, $IterableIterator } from './internal/$iterable';

declare function $enumerate<T = any>(
  iterable: $InputIterable<T>,
  start?: number,
): $IterableIterator<[number, T]>;

export default $enumerate;
