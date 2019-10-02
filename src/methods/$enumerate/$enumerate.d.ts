import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $enumerate<T = any>(iterable: $SourceIterable<T>): $ResultIterable<[number, T]>;

declare function $enumerate<T = any>(
  firstIdx: number,
  source: $SourceIterable<T>,
): $ResultIterable<[number, T]>;

declare function $enumerate(
  firstIdx: number,
): <T = any>(source: $SourceIterable<T>) => $ResultIterable<[number, T]>;

export default $enumerate;
