import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $group<T>(source: $SourceIterable<T>): $ResultIterable<[T, $ResultIterable<T>]>;

export default $group;
