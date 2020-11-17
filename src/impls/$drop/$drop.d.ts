import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $drop<T>(n: number, iterable: $SourceIterable<T>): $ResultIterable<T>;

declare function $drop<T>(n: number): (iterable: $SourceIterable<T>) => $ResultIterable<T>;

export default $drop;
