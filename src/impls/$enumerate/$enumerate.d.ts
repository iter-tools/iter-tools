import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $enumerate<T>(iterable: $SourceIterable<T>): $ResultIterable<[number, T]>;

declare function $enumerate<T>(
  firstIdx: number,
  source: $SourceIterable<T>,
): $ResultIterable<[number, T]>;

declare function $enumerate(
  firstIdx: number,
): <T>(source: $SourceIterable<T>) => $ResultIterable<[number, T]>;

export { $enumerate };
