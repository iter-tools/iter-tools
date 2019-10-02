import { $SourceIterable, $ResultIterable } from '../../internal/$iterable';

declare function $enumerate<T = any>(iterable: $SourceIterable<T>): $ResultIterable<[number, T]>;

declare function $enumerate<T = any>(
  firstIdx: number,
  iterable: $SourceIterable<T>,
): $ResultIterable<[number, T]>;

declare function $enumerate(
  firstIdx: number,
): <T = any>(iterable: $SourceIterable<T>) => $ResultIterable<[number, T]>;

export default $enumerate;
