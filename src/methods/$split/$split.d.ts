import { ResultIterable as SyncResultIterable } from '../../types/iterable';
import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $split<T = any>(
  iterable: $SourceIterable<T>,
): $ResultIterable<SyncResultIterable<T>>;

declare function $split(iterable: string): string;

export default $split;
