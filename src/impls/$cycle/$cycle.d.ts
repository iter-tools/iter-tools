import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $cycle<T>(source: $Wrappable<T>): $IterableIterator<T>;

export { $cycle };
