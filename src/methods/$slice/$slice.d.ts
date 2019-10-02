import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $slice<T = any>(opts: {
  readonly start?: number;
  readonly end?: number;
  readonly step?: number;
}): (iterable: $SourceIterable<T>) => $ResultIterable<T>;

declare function $slice<T = any>(
  start?: number,
  end?: number,
  step?: number,
): (iterable: $SourceIterable<T>) => $ResultIterable<T>;

declare function $slice<T = any>(
  opts: {
    readonly start?: number;
    readonly end?: number;
    readonly step?: number;
  },
  iterable: $SourceIterable<T>,
): $ResultIterable<T>;

declare function $slice<T = any>(start: number, iterable: $SourceIterable<T>): $ResultIterable<T>;

declare function $slice<T = any>(
  start: number,
  end: number,
  iterable: $SourceIterable<T>,
): $ResultIterable<T>;

declare function $slice<T = any>(
  start: number,
  end: number,
  step: number,
  iterable: $SourceIterable<T>,
): $ResultIterable<T>;

export default $slice;
