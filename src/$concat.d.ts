import { $IterableLike, $IterableIterator } from './internal/$iterable';

declare function $concat<T = any>(...iterables: Array<$IterableLike<T>>): $IterableIterator<T>;

export default $concat;
