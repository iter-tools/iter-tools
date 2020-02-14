import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

declare function $deepEqual<T>(iterable: $SourceIterable<T>): $Promise<T>;

export default $deepEqual;
