import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../internal/$iterable';
import { SourceIterable as SyncSourceIterable } from '../../internal/iterable';

declare function $includesAnySubseq(
  subseqs: SyncSourceIterable<$SourceIterable<any>>,
): (iterable: $SourceIterable<any>) => $Promise<boolean>;

declare function $includesAnySubseq(
  subseqs: SyncSourceIterable<$SourceIterable<any>>,
  iterable: $SourceIterable<any>,
): $Promise<boolean>;

export default $includesAnySubseq;
