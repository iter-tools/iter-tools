import { $Wrappable, $IterableIterator } from '../../types/$iterable';
import { IterableIterator as SyncIterableIterator } from '../../types/iterable';

declare function $window<T>(
  size: number,
  source: $Wrappable<T>,
): $IterableIterator<SyncIterableIterator<T>>;

declare function $window(
  size: number,
): <T>(source: $Wrappable<T>) => $IterableIterator<SyncIterableIterator<T>>;

export { $window };
