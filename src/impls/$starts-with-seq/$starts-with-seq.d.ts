import { $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $startsWithSeq(
  same: (a: any, b: any) => boolean,
  seq: $Wrappable<any>,
): (iterable: $Wrappable<any>) => $Promise<boolean>;

declare function $startsWithSeq(
  same: (a: any, b: any) => boolean,
  seq: $Wrappable<any>,
  iterable: $Wrappable<any>,
): $Promise<boolean>;

declare function $startsWithSeq(seq: $Wrappable<any>, iterable: $Wrappable<any>): $Promise<boolean>;

export { $startsWithSeq };
