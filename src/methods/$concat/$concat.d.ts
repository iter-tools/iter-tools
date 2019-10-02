import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $concat<T = any>(...iterables: Array<$SourceIterable<T>>): $ResultIterable<T>;

export default $concat;
