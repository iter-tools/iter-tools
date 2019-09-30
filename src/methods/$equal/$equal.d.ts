import { $MaybePromise } from '../../../generate/async.macro';

import { $InputIterable } from '../../internal/$iterable';

declare function $equal(...iterables: Array<$InputIterable<any>>): $MaybePromise<boolean>;

export default $equal;
