import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $take<T>(n: number, iterable: $SourceIterable<T>): $ResultIterable<T>;

declare function $take<T>(n: number): (iterable: $SourceIterable<T>) => $ResultIterable<T>;

export default $take;
