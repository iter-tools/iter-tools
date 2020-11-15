import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

declare function $startsWithAnySeq(
  valueSeqs: Array<$SourceIterable<any>>,
): (iterable: $SourceIterable<any>) => $Promise<boolean>;

declare function $startsWithAnySeq(
  valueSeqs: Array<$SourceIterable<any>>,
  iterable: $SourceIterable<any>,
): $Promise<boolean>;

export default $startsWithAnySeq;
