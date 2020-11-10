import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

declare function $str(strings: $SourceIterable<string>): $Promise<string>;

declare function $str(strings: $SourceIterable<$SourceIterable<string>>): $Promise<string>;

export default $str;
