import { $InputIterable, $GeneratorIterator } from '../../internal/$iterable';

declare function $concat<T = any>(...iterables: Array<$InputIterable<T>>): $GeneratorIterator<T>;

export default $concat;
