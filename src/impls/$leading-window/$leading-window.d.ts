import { $Wrappable, $IterableIterator } from '../../types/$iterable';
import { IterableIterator as SyncIterableIterator } from '../../types/iterable';

declare function $leadingWindow<T>(
  size: number,
  opts: {
    useFiller: false;
    readonly filler?: any;
  },
  source: $Wrappable<T>,
): $IterableIterator<SyncIterableIterator<T>>;

declare function $leadingWindow(
  size: number,
  opts?: {
    useFiller: false;
    readonly filler?: any;
  },
): <T>(source: $Wrappable<T>) => $IterableIterator<SyncIterableIterator<T>>;

declare function $leadingWindow<T, Filler = undefined>(
  size: number,
  opts: {
    useFiller?: boolean;
    readonly filler?: Filler;
  },
  source: $Wrappable<T>,
): $IterableIterator<SyncIterableIterator<T | Filler>>;

declare function $leadingWindow<T>(
  size: number,
  source: $Wrappable<T>,
): $IterableIterator<SyncIterableIterator<T | undefined>>;

declare function $leadingWindow<Filler = undefined>(
  size: number,
  opts?: {
    useFiller?: boolean;
    readonly filler?: Filler;
  },
): <T>(source: $Wrappable<T>) => $IterableIterator<SyncIterableIterator<T | Filler>>;

export { $leadingWindow };
