import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $cycle<T>(source: $SourceIterable<T>): $ResultIterable<T>;

export default $cycle;
