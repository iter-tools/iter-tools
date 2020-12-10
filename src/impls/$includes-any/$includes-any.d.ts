import { $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $includesAny(
  same: (a: any, b: any) => boolean,
  values: Array<any>,
): (iterable: $Wrappable<any>) => $Promise<boolean>;

declare function $includesAny(
  same: (a: any, b: any) => boolean,
  values: Array<any>,
  iterable: $Wrappable<any>,
): $Promise<boolean>;

declare function $includesAny(values: Array<any>, iterable: $Wrappable<any>): $Promise<boolean>;

export { $includesAny };
