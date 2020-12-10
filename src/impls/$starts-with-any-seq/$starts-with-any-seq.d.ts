import { $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $startsWithAnySeq(
  same: (a: any, b: any) => boolean,
  seqs: Array<$Wrappable<any>>,
): (iterable: $Wrappable<any>) => $Promise<boolean>;

declare function $startsWithAnySeq(
  same: (a: any, b: any) => boolean,
  seqs: Array<$Wrappable<any>>,
  iterable: $Wrappable<any>,
): $Promise<boolean>;

declare function $startsWithAnySeq(
  seqs: Array<$Wrappable<any>>,
  iterable: $Wrappable<any>,
): $Promise<boolean>;

export { $startsWithAnySeq };
