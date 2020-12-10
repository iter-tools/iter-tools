import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $take<T>(n: number, iterable: $Wrappable<T>): $IterableIterator<T>;

declare function $take<T>(n: number): (iterable: $Wrappable<T>) => $IterableIterator<T>;

export { $take };
