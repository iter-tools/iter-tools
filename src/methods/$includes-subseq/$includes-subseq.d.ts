import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../internal/$iterable';

declare function $includesSubseq(
  subseq: $SourceIterable<any>,
): (iterable: $SourceIterable<any>) => $Promise<boolean>;

declare function $includesSubseq(
  subseq: $SourceIterable<any>,
  iterable: $SourceIterable<any>,
): $Promise<boolean>;

export default $includesSubseq;
