import { $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $equal(...iterables: Array<$Wrappable<any>>): $Promise<boolean>;

export { $equal };
