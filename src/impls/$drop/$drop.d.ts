import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $drop<T>(n: number, iterable: $Wrappable<T>): $IterableIterator<T>;

declare function $drop<T>(n: number): (iterable: $Wrappable<T>) => $IterableIterator<T>;

export { $drop };
