import { $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

declare function $joinAsStringWith(
  separator: string,
  strings: $SourceIterable<string>,
): $MaybePromise<string>;

declare function $joinAsStringWith(
  separator: string,
  strings: $SourceIterable<$SourceIterable<string>>,
): $MaybePromise<string>;

declare function $joinAsStringWith(
  separator: string,
): (strings: $SourceIterable<string>) => $MaybePromise<string>;

declare function $joinAsStringWith(
  separator: string,
): (strings: $SourceIterable<$SourceIterable<string>>) => $MaybePromise<string>;

export default $joinAsStringWith;
