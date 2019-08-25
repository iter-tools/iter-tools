import { $InputIterable, $MaybePromise } from '../../internal/$iterable';

declare function $toArray<T>(iterable: $InputIterable<T>): $MaybePromise<T[]>;

export default $toArray;
