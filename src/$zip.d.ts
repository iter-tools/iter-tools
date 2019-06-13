import { $IterableLike, $IterableIterator } from './internal/$iterable';

declare function $zip<T = any>(...iterables: Array<$IterableLike<T>>): $IterableIterator<T[]>;

export default $zip;
