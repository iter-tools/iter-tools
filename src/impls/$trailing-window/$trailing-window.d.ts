import { $Wrappable, $IterableIterator } from '../../types/$iterable';
import { IterableIterator as SyncIterableIterator } from '../../types/iterable';

declare function $trailingWindow<T, Filler = undefined>(
  size: number,
  opts: {
    readonly filler?: Filler;
  },
  source: $Wrappable<T>,
): $IterableIterator<SyncIterableIterator<T | Filler>>;

declare function $trailingWindow<T>(
  size: number,
  source: $Wrappable<T>,
): $IterableIterator<SyncIterableIterator<T | undefined>>;

declare function $trailingWindow(
  size: number,
  opts: {
    readonly filler: any;
  },
): <T>(source: $Wrappable<T>) => $IterableIterator<SyncIterableIterator<T>>;

declare function $trailingWindow(
  size: number,
): <T>(source: $Wrappable<T>) => $IterableIterator<SyncIterableIterator<T | undefined>>;

export { $trailingWindow };
