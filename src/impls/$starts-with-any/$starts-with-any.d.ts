import { $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $startsWithAny(
  same: (a: any, b: any) => boolean,
  values: Array<any>,
): (iterable: $Wrappable<any>) => $Promise<boolean>;

declare function $startsWithAny(
  same: (a: any, b: any) => boolean,
  values: Array<any>,
  iterable: $Wrappable<any>,
): $Promise<boolean>;

declare function $startsWithAny(values: Array<any>, iterable: $Wrappable<any>): $Promise<boolean>;

export { $startsWithAny };
