import { ResultSubseqIterable as SyncResultSubseqIterable } from '../../types/iterable';
import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $split<T>(
  source: $SourceIterable<T>,
): $ResultIterable<SyncResultSubseqIterable<T>>;

declare function $split(source: string): string;

export default $split;
