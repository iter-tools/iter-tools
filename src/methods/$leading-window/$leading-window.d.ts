import { $SourceIterable, $ResultIterable } from '../../types/$iterable';
import { ResultIterable as SyncResultIterable } from '../../types/iterable';

declare function $leadingWindow<T>(
  size: number,
  opts: {
    useFiller: false;
    readonly filler?: any;
  },
  source: $SourceIterable<T>,
): $ResultIterable<SyncResultIterable<T>>;

declare function $leadingWindow(
  size: number,
  opts?: {
    useFiller: false;
    readonly filler?: any;
  },
): <T>(source: $SourceIterable<T>) => $ResultIterable<SyncResultIterable<T>>;

declare function $leadingWindow<T, Filler = undefined>(
  size: number,
  opts: {
    useFiller?: boolean;
    readonly filler?: Filler;
  },
  source: $SourceIterable<T>,
): $ResultIterable<SyncResultIterable<T | Filler>>;

declare function $leadingWindow<T>(
  size: number,
  source: $SourceIterable<T>,
): $ResultIterable<SyncResultIterable<T | undefined>>;

declare function $leadingWindow<Filler = undefined>(
  size: number,
  opts?: {
    useFiller?: boolean;
    readonly filler?: Filler;
  },
): <T>(source: $SourceIterable<T>) => $ResultIterable<SyncResultIterable<T | Filler>>;

export default $leadingWindow;
