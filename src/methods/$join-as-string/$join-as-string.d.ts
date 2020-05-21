import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

declare function $joinAsString(strings: $SourceIterable<string>): $Promise<string>;

declare function $joinAsString(strings: $SourceIterable<$SourceIterable<string>>): $Promise<string>;

export default $joinAsString;
