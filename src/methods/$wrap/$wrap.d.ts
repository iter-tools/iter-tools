import { $SourceIterable, $ResultIterable } from '../../internal/$iterable';

declare function $wrap<T = any>(iterable: $SourceIterable<T>): $ResultIterable<T>;

export default $wrap;
