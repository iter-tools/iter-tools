import { $Promise } from '../../../generate/async.macro.cjs';

import { $SourceIterable } from '../../types/$iterable';

declare function $startsWithSeq(
  valueSeq: $SourceIterable<any>,
): (iterable: $SourceIterable<any>) => $Promise<boolean>;

declare function $startsWithSeq(
  valueSeq: $SourceIterable<any>,
  iterable: $SourceIterable<any>,
): $Promise<boolean>;

export { $startsWithSeq };
