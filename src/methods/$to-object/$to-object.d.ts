import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

declare function $toObject<V>(source: $SourceIterable<[string, V]>): $Promise<{ [key: string]: V }>;

export default $toObject;
