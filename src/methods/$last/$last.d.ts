import { $Promise } from '../../../generate/async.macro';

import { $InputIterable } from '../../internal/$iterable';

declare function $last<T = any>(iterable: $InputIterable<T>): $Promise<T | undefined>;

export default $last;
