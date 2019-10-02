import { $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

declare function $equal(...iterables: Array<$SourceIterable<any>>): $MaybePromise<boolean>;

export default $equal;
