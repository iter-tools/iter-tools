import { $MaybePromise } from '../../../generate/async.macro';

import { $InputIterable } from '../../internal/$iterable';

declare function $joinAsStringWith(
  value: string,
  iterable: $InputIterable<string>,
): $MaybePromise<string>;

declare function $joinAsStringWith(
  value: string,
  iterable: $InputIterable<$InputIterable<string>>,
): $MaybePromise<string>;

declare function $joinAsStringWith(
  value: string,
): (iterable: $InputIterable<string>) => $MaybePromise<string>;

declare function $joinAsStringWith(
  value: string,
): (iterable: $InputIterable<$InputIterable<string>>) => $MaybePromise<string>;

export default $joinAsStringWith;
