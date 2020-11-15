import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

declare function $includesSeq(
  seq: $SourceIterable<any>,
): (iterable: $SourceIterable<any>) => $Promise<boolean>;

declare function $includesSeq(
  seq: $SourceIterable<any>,
  iterable: $SourceIterable<any>,
): $Promise<boolean>;

export default $includesSeq;
