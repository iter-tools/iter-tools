import { $InputIterable, $GeneratorIterator } from '../../internal/$iterable';

declare function $join<T = any>(iterable: $InputIterable<$InputIterable<T>>): $GeneratorIterator<T>;

export default $join;
