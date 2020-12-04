import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $reverse<T>(source: $SourceIterable<T>): $ResultIterable<T>;

export { $reverse };
