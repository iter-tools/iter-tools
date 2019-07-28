import { $InputIterable, $GeneratorIterator } from './internal/$iterable';

declare function $zip<T = any>(...iterables: Array<$InputIterable<T>>): $GeneratorIterator<T[]>;

export default $zip;
