import { $SourceIterable, $ResultIterable } from '../../internal/$iterable';

declare function $reverse<T = any>(iterable: $SourceIterable<T>): $ResultIterable<T>;

export default $reverse;
