import { IterableIterator as SyncIterableIterator } from '../../types/iterable';
import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $fork<T>(source: $Wrappable<T>): SyncIterableIterator<$IterableIterator<T>>;

export { $fork };
