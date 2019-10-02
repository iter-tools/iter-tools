import { $MaybePromise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../internal/$iterable';

declare function $joinAsStringWith(
  value: string,
  iterable: $SourceIterable<string>,
): $MaybePromise<string>;

declare function $joinAsStringWith(
  value: string,
  iterable: $SourceIterable<$SourceIterable<string>>,
): $MaybePromise<string>;

declare function $joinAsStringWith(
  value: string,
): (iterable: $SourceIterable<string>) => $MaybePromise<string>;

declare function $joinAsStringWith(
  value: string,
): (iterable: $SourceIterable<$SourceIterable<string>>) => $MaybePromise<string>;

export default $joinAsStringWith;
