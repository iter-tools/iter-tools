import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $slice<T = any>(opts: {
  readonly start?: number;
  readonly end?: number;
  readonly step?: number;
}): (source: $SourceIterable<T>) => $ResultIterable<T>;

declare function $slice<T = any>(
  start?: number,
  end?: number,
  step?: number,
): (source: $SourceIterable<T>) => $ResultIterable<T>;

declare function $slice<T = any>(
  opts: {
    readonly start?: number;
    readonly end?: number;
    readonly step?: number;
  },
  source: $SourceIterable<T>,
): $ResultIterable<T>;

declare function $slice<T = any>(start: number, source: $SourceIterable<T>): $ResultIterable<T>;

declare function $slice<T = any>(
  start: number,
  end: number,
  source: $SourceIterable<T>,
): $ResultIterable<T>;

declare function $slice<T = any>(
  start: number,
  end: number,
  step: number,
  source: $SourceIterable<T>,
): $ResultIterable<T>;

export default $slice;
