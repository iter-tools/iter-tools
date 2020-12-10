import { $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $str(strings: $Wrappable<string>): $Promise<string>;

declare function $str(strings: $Wrappable<{ toString(): string }>): $Promise<string>;

export { $str };
