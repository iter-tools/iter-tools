import { $IterableLike, $IterableIterator } from './internal/$iterable';

declare function $batch(n: number): <T>(iterable: $IterableLike<T>) => $IterableIterator<T[]>;

declare function $batch<T = any>(n: number, iterable: $IterableLike<T>): $IterableIterator<T[]>;

export default $batch;
