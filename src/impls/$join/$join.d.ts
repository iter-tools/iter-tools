import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $join<T>(source: $SourceIterable<$SourceIterable<T>>): $ResultIterable<T>;

export default $join;
