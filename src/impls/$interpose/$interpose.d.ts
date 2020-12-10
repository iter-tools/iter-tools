import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $interpose<V>(value: V): <T>(source: $Wrappable<T>) => $IterableIterator<T | V>;

declare function $interpose<V, T>(value: V, source: $Wrappable<T>): $IterableIterator<T | V>;

export { $interpose };
