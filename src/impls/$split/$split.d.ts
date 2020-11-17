import { ResultIterable as SyncResultIterable } from '../../types/iterable';
import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $split<T>(source: $SourceIterable<T>): $ResultIterable<SyncResultIterable<T>>;

declare function $split(source: string): string;

export default $split;
