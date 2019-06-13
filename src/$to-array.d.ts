import { $IterableLike, $MaybePromise } from './internal/$iterable';

declare function $toArray<T>(iterable: $IterableLike<T>): $MaybePromise<T[]>;

export default $toArray;
