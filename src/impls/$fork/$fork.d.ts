import { IterableIterator as SyncIterableIterator } from '../../types/iterable';
import { $Wrappable, $SingletonIterableIterator } from '../../types/$iterable';

declare function $fork<T>(
  source: $Wrappable<T>,
): SyncIterableIterator<$SingletonIterableIterator<T>>;

export { $fork };
