import { $InputIterable, $MaybePromise } from '../../internal/$iterable';

declare function $equal(...iterables: Array<$InputIterable<any>>): $MaybePromise<boolean>;

export default $equal;
