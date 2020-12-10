import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $prepend<T, V>(value: V, source: $Wrappable<T>): $IterableIterator<V | T>;

declare function $prepend<V>(value: V): <T>(source: $Wrappable<T>) => $IterableIterator<V | T>;

export { $prepend };
