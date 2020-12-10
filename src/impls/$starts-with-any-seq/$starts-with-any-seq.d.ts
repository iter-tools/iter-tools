import { $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $startsWithAnySeq(
  valueSeqs: Array<$Wrappable<any>>,
): (iterable: $Wrappable<any>) => $Promise<boolean>;

declare function $startsWithAnySeq(
  valueSeqs: Array<$Wrappable<any>>,
  iterable: $Wrappable<any>,
): $Promise<boolean>;

export { $startsWithAnySeq };
