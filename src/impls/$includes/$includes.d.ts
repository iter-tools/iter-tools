import { $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $includes(
  same: (a: any, b: any) => boolean,
  value: any,
): (iterable: $Wrappable<any>) => $Promise<boolean>;

declare function $includes(
  same: (a: any, b: any) => boolean,
  value: any,
  iterable: $Wrappable<any>,
): $Promise<boolean>;

declare function $includes(value: any, iterable: $Wrappable<any>): $Promise<boolean>;

export { $includes };
