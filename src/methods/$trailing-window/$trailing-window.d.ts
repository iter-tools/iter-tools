import { $SourceIterable, $ResultIterable } from '../../types/$iterable';
import { ResultIterable as SyncResultIterable } from '../../types/iterable';

declare function $trailingWindow<Filler = undefined, T = any>(
  size: number,
  opts: {
    readonly filler?: Filler;
  },
  source: $SourceIterable<T>,
): $ResultIterable<SyncResultIterable<T | Filler>>;

declare function $trailingWindow<T = any>(
  size: number,
  source: $SourceIterable<T>,
): $ResultIterable<SyncResultIterable<T | undefined>>;

declare function $trailingWindow(
  size: number,
  opts: {
    readonly filler: any;
  },
): <T>(source: $SourceIterable<T>) => $ResultIterable<SyncResultIterable<T>>;

declare function $trailingWindow(
  size: number,
): <T = any>(source: $SourceIterable<T>) => $ResultIterable<SyncResultIterable<T | undefined>>;

export default $trailingWindow;
