import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $join<T>(source: $Wrappable<$Wrappable<T>>): $IterableIterator<T>;

export { $join };
