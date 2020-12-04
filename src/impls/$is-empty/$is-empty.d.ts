import { $Promise } from '../../../generate/async.macro.cjs';

import { $SourceIterable } from '../../types/$iterable';

declare function $isEmpty(iterable: $SourceIterable<any>): $Promise<boolean>;

export { $isEmpty };
