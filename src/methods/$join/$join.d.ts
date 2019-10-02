import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $join<T = any>(iterable: $SourceIterable<$SourceIterable<T>>): $ResultIterable<T>;

export default $join;
