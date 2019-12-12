import { $SourceIterable, $ResultIterable } from '../../types/$iterable';
import { ResultIterable as SyncResultIterable } from '../../types/iterable';

declare function $leadingWindow<T, Filler = undefined>(
  size: number,
  opts: {
    readonly filler?: Filler;
  },
  source: $SourceIterable<T>,
): $ResultIterable<SyncResultIterable<T | Filler>>;

declare function $leadingWindow<T>(
  size: number,
  source: $SourceIterable<T>,
): $ResultIterable<SyncResultIterable<T | undefined>>;

declare function $leadingWindow(
  size: number,
  opts: {
    readonly filler: any;
  },
): <T>(source: $SourceIterable<T>) => $ResultIterable<SyncResultIterable<T>>;

declare function $leadingWindow(
  size: number,
): <T>(source: $SourceIterable<T>) => $ResultIterable<SyncResultIterable<T | undefined>>;

export default $leadingWindow;
