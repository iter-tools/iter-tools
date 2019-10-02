import { $SourceIterable, $ResultIterable } from '../../internal/$iterable';

declare function $batch(size: number): <T>(iterable: $SourceIterable<T>) => $ResultIterable<T[]>;

declare function $batch<T = any>(size: number, iterable: $SourceIterable<T>): $ResultIterable<T[]>;

export default $batch;
