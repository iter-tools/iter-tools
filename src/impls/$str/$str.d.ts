import { $Promise } from '../../../generate/async.macro.cjs';

import { $SourceIterable } from '../../types/$iterable';

declare function $str(strings: $SourceIterable<string>): $Promise<string>;

declare function $str(strings: $SourceIterable<{ toString(): string }>): $Promise<string>;

export default $str;
