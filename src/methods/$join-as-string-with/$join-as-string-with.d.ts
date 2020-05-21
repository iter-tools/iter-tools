import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

declare function $joinAsStringWith(
  separator: string,
  strings: $SourceIterable<string>,
): $Promise<string>;

declare function $joinAsStringWith(
  separator: string,
  strings: $SourceIterable<$SourceIterable<string>>,
): $Promise<string>;

declare function $joinAsStringWith(
  separator: string,
): (strings: $SourceIterable<string>) => $Promise<string>;

declare function $joinAsStringWith(
  separator: string,
): (strings: $SourceIterable<$SourceIterable<string>>) => $Promise<string>;

export default $joinAsStringWith;
