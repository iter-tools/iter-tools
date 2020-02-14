import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';
import { SourceIterable as SyncSourceIterable } from '../../types/iterable';

declare function $includesAnySubseq(
  valueSubseqs: SyncSourceIterable<$SourceIterable<any>>,
): (iterable: $SourceIterable<any>) => $Promise<boolean>;

declare function $includesAnySubseq(
  valueSubseqs: SyncSourceIterable<$SourceIterable<any>>,
  iterable: $SourceIterable<any>,
): $Promise<boolean>;

declare function $includesAnySubseq<V, T>(
  valueSubseqs: SyncSourceIterable<$SourceIterable<V>>,
  compare: (value: V, item: T) => boolean,
): (iterable: $SourceIterable<T>) => $Promise<boolean>;

declare function $includesAnySubseq<V, T>(
  valueSubseqs: SyncSourceIterable<$SourceIterable<V>>,
  compare: (value: V, item: T) => boolean,
  iterable: $SourceIterable<T>,
): $Promise<boolean>;

export default $includesAnySubseq;
