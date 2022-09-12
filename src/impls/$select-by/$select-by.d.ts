import { $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $selectBy<T>(): $Promise<T>;

declare function $selectBy<T, K>(
  mapper: (item: T) => K,
  selector: (current: K, value: K) => boolean,
): (iterable: $Wrappable<T>) => $Promise<T | undefined>;

declare function $selectBy<T, K>(
  mapper: (item: T) => K,
  selector: (current: K, value: K) => boolean,
  iterable: $Wrappable<T>,
): $Promise<T | undefined>;

export { $selectBy };
