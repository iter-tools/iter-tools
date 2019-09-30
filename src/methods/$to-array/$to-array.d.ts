import { $MaybePromise } from '../../../generate/async.macro';

import { $InputIterable } from '../../internal/$iterable';

declare function $toArray<T>(iterable: $InputIterable<T>): $MaybePromise<T[]>;

export default $toArray;
