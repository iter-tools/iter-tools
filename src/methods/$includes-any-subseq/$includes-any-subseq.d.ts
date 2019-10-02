import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';
import { SourceIterable as SyncSourceIterable } from '../../types/iterable';

declare function $includesAnySubseq(
  subseqs: SyncSourceIterable<$SourceIterable<any>>,
): (iterable: $SourceIterable<any>) => $Promise<boolean>;

declare function $includesAnySubseq(
  subseqs: SyncSourceIterable<$SourceIterable<any>>,
  iterable: $SourceIterable<any>,
): $Promise<boolean>;

export default $includesAnySubseq;
