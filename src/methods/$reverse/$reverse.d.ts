import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $reverse<T = any>(source: $SourceIterable<T>): $ResultIterable<T>;

export default $reverse;
