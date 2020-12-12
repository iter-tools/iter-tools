import { $Wrappable, $IterableIterator } from '../../types/$iterable';
import { IterableIterator as SyncIterableIterator } from '../../types/iterable';

declare function $windowBehind<T, Filler = undefined>(
  opts: {
    readonly filler?: Filler;
  },
  size: number,
  source: $Wrappable<T>,
): $IterableIterator<SyncIterableIterator<T | Filler>>;

declare function $windowBehind<T>(
  size: number,
  source: $Wrappable<T>,
): $IterableIterator<SyncIterableIterator<T | undefined>>;

declare function $windowBehind(
  opts: {
    readonly filler: any;
  },
  size: number,
): <T>(source: $Wrappable<T>) => $IterableIterator<SyncIterableIterator<T>>;

declare function $windowBehind(
  size: number,
): <T>(source: $Wrappable<T>) => $IterableIterator<SyncIterableIterator<T | undefined>>;

export { $windowBehind };
