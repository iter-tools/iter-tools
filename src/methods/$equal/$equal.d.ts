import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

declare function $equal(...iterables: Array<$SourceIterable<any>>): $Promise<boolean>;

export default $equal;
