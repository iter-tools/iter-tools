import { $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $includesAnySeq(
  same: (a: any, b: any) => boolean,
  value: Array<$Wrappable<any>>,
): (iterable: $Wrappable<any>) => $Promise<boolean>;

declare function $includesAnySeq(
  same: (a: any, b: any) => boolean,
  value: Array<$Wrappable<any>>,
  iterable: $Wrappable<any>,
): $Promise<boolean>;

declare function $includesAnySeq(
  value: Array<$Wrappable<any>>,
  iterable: $Wrappable<any>,
): $Promise<boolean>;

export { $includesAnySeq };
