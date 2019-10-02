import { $SourceIterable, $ResultIterable } from '../../internal/$iterable';

declare function $zip<T = any>(...iterables: Array<$SourceIterable<T>>): $ResultIterable<T[]>;

export default $zip;
