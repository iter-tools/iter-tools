import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $interpose<V>(value: V): <T>(source: $SourceIterable<T>) => $ResultIterable<T | V>;

declare function $interpose<V, T>(value: V, source: $SourceIterable<T>): $ResultIterable<T | V>;

export default $interpose;
