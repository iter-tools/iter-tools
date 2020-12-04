import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $prepend<T, V>(value: V, source: $SourceIterable<T>): $ResultIterable<V | T>;

declare function $prepend<V>(value: V): <T>(source: $SourceIterable<T>) => $ResultIterable<V | T>;

export { $prepend };
