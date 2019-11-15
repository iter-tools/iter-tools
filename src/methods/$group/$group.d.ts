import { $SourceIterable, $ResultSubseqIterable } from '../../types/$iterable';
import { $EntryIterable } from '../../types/$entry-iterable';

declare function $group<T>(source: $SourceIterable<T>): $EntryIterable<T, $ResultSubseqIterable<T>>;

export default $group;
