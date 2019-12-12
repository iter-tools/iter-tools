import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $cycle<T>(iterable: $SourceIterable<T>): $ResultIterable<T>;

export default $cycle;
