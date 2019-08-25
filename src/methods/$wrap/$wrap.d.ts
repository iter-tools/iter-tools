import { $InputIterable, $GeneratorIterator } from '../../internal/$iterable';

declare function $wrap<T = any>(iterable: $InputIterable<T>): $GeneratorIterator<T>;

export default $wrap;
