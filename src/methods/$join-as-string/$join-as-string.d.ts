import { $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

declare function $joinAsString(strings: $SourceIterable<string>): $MaybePromise<string>;

declare function $joinAsString(
  strings: $SourceIterable<$SourceIterable<string>>,
): $MaybePromise<string>;

export default $joinAsString;
