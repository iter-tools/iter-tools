import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $batch(size: number): <T>(source: $SourceIterable<T>) => $ResultIterable<T[]>;

declare function $batch<T = any>(size: number, source: $SourceIterable<T>): $ResultIterable<T[]>;

export default $batch;
