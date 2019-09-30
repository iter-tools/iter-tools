import { $Promise } from '../../../generate/async.macro';

import { $InputIterable } from '../../internal/$iterable';

declare function $startsWithSubseq(
  subseq: $InputIterable<any>,
): (iterable: $InputIterable<any>) => $Promise<boolean>;

declare function $startsWithSubseq(
  subseq: $InputIterable<any>,
  iterable: $InputIterable<any>,
): $Promise<boolean>;

export default $startsWithSubseq;
