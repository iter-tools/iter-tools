import { $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $toArray<T>(source: $Wrappable<T>): $Promise<Array<T>>;

export { $toArray };
