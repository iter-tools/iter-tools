import { $Promise, $MaybePromise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $some<T>(
  func: (value: T, i: number) => $MaybePromise<boolean>,
): (iterable: $Wrappable<T>) => $Promise<boolean>;

declare function $some<T>(
  func: (value: T, i: number) => $MaybePromise<boolean>,
  iterable: $Wrappable<T>,
): $Promise<boolean>;

export { $some };
