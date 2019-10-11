import { $SourceIterable, $ResultIterable } from '../../types/$iterable';
import { ResultIterable as SyncResultIterable } from '../../types/iterable';

declare function $window<Filler = undefined, T = any>(
  size: number,
  opts: {
    readonly filler?: Filler;
  },
  source: $SourceIterable<T>,
): $ResultIterable<SyncResultIterable<T | Filler>>;

declare function $window<T = any>(
  size: number,
  source: $SourceIterable<T>,
): $ResultIterable<SyncResultIterable<T | undefined>>;

declare function $window(
  size: number,
  opts: {
    readonly filler: any;
  },
): <T>(source: $SourceIterable<T>) => $ResultIterable<SyncResultIterable<T>>;

declare function $window(
  size: number,
): <T = any>(source: $SourceIterable<T>) => $ResultIterable<SyncResultIterable<T | undefined>>;

export default $window;
