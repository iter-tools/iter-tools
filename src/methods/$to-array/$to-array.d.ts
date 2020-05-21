import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

declare function $toArray<T>(source: $SourceIterable<T>): $Promise<T[]>;

export default $toArray;
