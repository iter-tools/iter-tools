import { IterableIterator as SyncIterableIterator } from '../../types/iterable';
import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $split<T>(source: $Wrappable<T>): $IterableIterator<SyncIterableIterator<T>>;

export { $split };
