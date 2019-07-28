import { $InputIterable, $IterableIterator } from './internal/$iterable';

declare function $zip<T = any>(...iterables: Array<$InputIterable<T>>): $IterableIterator<T[]>;

export default $zip;
