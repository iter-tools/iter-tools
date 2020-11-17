import '../../../generate/async.macro.cjs';

import { $Iterable } from '../../types/$iterable';

declare function $unwrap<T>(iterable: $Iterable<T>): Array<T>;

declare function $unwrapDeep<T>(iterable: $Iterable<$Iterable<T>>): Array<Array<T>>;

declare function $unwrapDeep<T>(iterable: T): T;

export { $unwrap, $unwrapDeep };
