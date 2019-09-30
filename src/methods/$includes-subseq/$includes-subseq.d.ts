import { $Promise, $MaybePromise } from '../../../generate/async.macro';

import { $InputIterable } from '../../internal/$iterable';

declare function $includesSubseq(
  subseq: $InputIterable<any>,
): (iterable: $InputIterable<any>) => $Promise<boolean>;

declare function $includesSubseq(
  subseq: $InputIterable<any>,
  iterable: $InputIterable<any>,
): $Promise<boolean>;

export default $includesSubseq;
