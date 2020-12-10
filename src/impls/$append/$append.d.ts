import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $append<T, V>(value: V, source: $Wrappable<T>): $IterableIterator<V | T>;

declare function $append<V>(value: V): <T>(source: $Wrappable<T>) => $IterableIterator<V | T>;

export { $append };
