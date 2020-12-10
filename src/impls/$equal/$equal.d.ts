import { $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $equal(
  same: (a: any, b: any) => boolean,
): (...seqs: Array<$Wrappable<any>>) => (iterable: $Wrappable<any>) => $Promise<boolean>;

declare function $equal(
  same: (a: any, b: any) => boolean,
  ...seqs: Array<$Wrappable<any>>
): (iterable: $Wrappable<any>) => $Promise<boolean>;

declare function $equal(
  ...seqs: Array<$Wrappable<any>>
): (iterable: $Wrappable<any>) => $Promise<boolean>;

export { $equal };
