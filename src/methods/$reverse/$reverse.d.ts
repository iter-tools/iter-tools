import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $reverse<T = any>(iterable: $SourceIterable<T>): $ResultIterable<T>;

export default $reverse;
