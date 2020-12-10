import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $batch(size: number): <T>(source: $Wrappable<T>) => $IterableIterator<T[]>;

declare function $batch<T>(size: number, source: $Wrappable<T>): $IterableIterator<T[]>;

export { $batch };
