import { $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $equal(
  same: (a: any, b: any) => boolean,
): (...seqs: Array<$Wrappable<any>>) => $Promise<boolean>;

declare function $equal<T>(
  same: (a: T, b: T) => boolean,
  ...seqs: Array<$Wrappable<T>>
): $Promise<boolean>;

declare function $equal(...seqs: Array<$Wrappable<any>>): $Promise<boolean>;

export { $equal };
