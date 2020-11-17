import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $concat<T>(...sources: Array<$SourceIterable<T>>): $ResultIterable<T>;

export default $concat;
