import { $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../internal/$iterable';

declare function $equal(...iterables: Array<$SourceIterable<any>>): $MaybePromise<boolean>;

export default $equal;
