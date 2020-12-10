import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $reverse<T>(source: $Wrappable<T>): $IterableIterator<T>;

export { $reverse };
