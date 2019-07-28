import { $InputIterable, $IterableIterator } from './internal/$iterable';

declare function $batch(n: number): <T>(iterable: $InputIterable<T>) => $IterableIterator<T[]>;

declare function $batch<T = any>(n: number, iterable: $InputIterable<T>): $IterableIterator<T[]>;

export default $batch;
