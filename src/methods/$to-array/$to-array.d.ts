import { $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../internal/$iterable';

declare function $toArray<T>(iterable: $SourceIterable<T>): $MaybePromise<T[]>;

export default $toArray;
