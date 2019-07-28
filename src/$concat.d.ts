import { $InputIterable, $IterableIterator } from './internal/$iterable';

declare function $concat<T = any>(...iterables: Array<$InputIterable<T>>): $IterableIterator<T>;

export default $concat;
