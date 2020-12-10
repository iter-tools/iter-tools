import { $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $isEmpty(iterable: $Wrappable<any>): $Promise<boolean>;

export { $isEmpty };
