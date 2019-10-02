import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

declare function $startsWithSubseq(
  subseq: $SourceIterable<any>,
): (iterable: $SourceIterable<any>) => $Promise<boolean>;

declare function $startsWithSubseq(
  subseq: $SourceIterable<any>,
  iterable: $SourceIterable<any>,
): $Promise<boolean>;

export default $startsWithSubseq;
