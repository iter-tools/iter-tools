import { ResultIterable as SyncResultIterable } from '../../internal/iterable';
import { $SourceIterable, $ResultIterable } from '../../internal/$iterable';

declare function $split<T = any>(
  iterable: $SourceIterable<T>,
): $ResultIterable<SyncResultIterable<T>>;

declare function $split(iterable: string): string;

export default $split;
