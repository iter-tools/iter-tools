import { $InputIterable, $Promise } from '../../internal/$iterable';

declare function $last<T = any>(iterable: $InputIterable<T>): $Promise<T | undefined>;

export default $last;
