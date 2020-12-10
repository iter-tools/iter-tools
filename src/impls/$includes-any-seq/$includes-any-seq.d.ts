import { $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $includesAnySeq(
  seqs: Array<$Wrappable<any>>,
): (iterable: $Wrappable<any>) => $Promise<boolean>;

declare function $includesAnySeq(
  seqs: Array<$Wrappable<any>>,
  iterable: $Wrappable<any>,
): $Promise<boolean>;

export { $includesAnySeq };
