import { IterableIterator as SyncIterableIterator } from '../../types/iterable';
import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $splitAt(
  idx: number,
): <T>(source: $Wrappable<T>) => SyncIterableIterator<$IterableIterator<T>>;

declare function $splitAt<T>(
  idx: number,
  source: $Wrappable<T>,
): SyncIterableIterator<$IterableIterator<T>>;

export { $splitAt };
