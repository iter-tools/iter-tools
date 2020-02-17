import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';
import { SourceIterable as SyncSourceIterable } from '../../types/iterable';

declare function $startsWithAny(
  values: SyncSourceIterable<any>,
): (iterable: $SourceIterable<any>) => $Promise<boolean>;

declare function $startsWithAny(
  values: SyncSourceIterable<any>,
  iterable: $SourceIterable<any>,
): $Promise<boolean>;

declare function $startsWithAny<V, T>(
  values: SyncSourceIterable<V>,
  compareEquality: (value: V, item: T) => boolean,
): (iterable: $SourceIterable<T>) => $Promise<boolean>;

declare function $startsWithAny<V, T>(
  values: SyncSourceIterable<V>,
  compareEquality: (value: V, item: T) => boolean,
  iterable: $SourceIterable<T>,
): $Promise<boolean>;

export default $startsWithAny;
