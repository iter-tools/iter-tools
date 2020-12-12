import { $Wrappable, $IterableIterator } from '../../types/$iterable';
import { IterableIterator as SyncIterableIterator } from '../../types/iterable';

declare function $windowAhead<T>(
  opts: {
    useFiller: false;
    readonly filler?: any;
  },
  size: number,
  source: $Wrappable<T>,
): $IterableIterator<SyncIterableIterator<T>>;

declare function $windowAhead<T, Filler = undefined>(
  opts: {
    useFiller?: boolean;
    readonly filler?: Filler;
  },
  size: number,
  source: $Wrappable<T>,
): $IterableIterator<SyncIterableIterator<T | Filler>>;

declare function $windowAhead<T>(
  size: number,
  source: $Wrappable<T>,
): $IterableIterator<SyncIterableIterator<T | undefined>>;

declare function $windowAhead(
  opts: {
    useFiller: false;
    readonly filler?: any;
  },
  size: number,
): <T>(source: $Wrappable<T>) => $IterableIterator<SyncIterableIterator<T>>;

declare function $windowAhead<Filler = undefined>(
  opts: {
    useFiller?: boolean;
    readonly filler?: Filler;
  },
  size: number,
): <T>(source: $Wrappable<T>) => $IterableIterator<SyncIterableIterator<T | Filler>>;

declare function $windowAhead(
  size: number,
): <T>(source: $Wrappable<T>) => $IterableIterator<SyncIterableIterator<T | undefined>>;

export { $windowAhead };
