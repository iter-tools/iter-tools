import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $append<T, V>(value: V, source: $SourceIterable<T>): $ResultIterable<V | T>;

declare function $append<V>(value: V): <T>(source: $SourceIterable<T>) => $ResultIterable<V | T>;

export default $append;
