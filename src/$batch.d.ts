import { $InputIterable, $GeneratorIterator } from './internal/$iterable';

declare function $batch(n: number): <T>(iterable: $InputIterable<T>) => $GeneratorIterator<T[]>;

declare function $batch<T = any>(n: number, iterable: $InputIterable<T>): $GeneratorIterator<T[]>;

export default $batch;
