import { $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $includesSeq(
  same: (a: any, b: any) => boolean,
  seq: $Wrappable<any>,
): (iterable: $Wrappable<any>) => $Promise<boolean>;

declare function $includesSeq(
  same: (a: any, b: any) => boolean,
  seq: $Wrappable<any>,
  iterable: $Wrappable<any>,
): $Promise<boolean>;

declare function $includesSeq(seq: $Wrappable<any>, iterable: $Wrappable<any>): $Promise<boolean>;

export { $includesSeq };
