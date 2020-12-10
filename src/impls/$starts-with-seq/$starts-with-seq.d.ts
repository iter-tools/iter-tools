import { $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $startsWithSeq(
  valueSeq: $Wrappable<any>,
): (iterable: $Wrappable<any>) => $Promise<boolean>;

declare function $startsWithSeq(
  valueSeq: $Wrappable<any>,
  iterable: $Wrappable<any>,
): $Promise<boolean>;

export { $startsWithSeq };
