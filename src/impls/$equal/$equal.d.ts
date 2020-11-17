import { $Promise } from '../../../generate/async.macro.cjs';

import { $SourceIterable } from '../../types/$iterable';

declare function $equal(...iterables: Array<$SourceIterable<any>>): $Promise<boolean>;

export default $equal;
