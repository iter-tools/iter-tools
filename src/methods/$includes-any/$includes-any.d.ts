import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';
import { SourceIterable as SyncSourceIterable } from '../../types/iterable';

declare function $includesAny(
  values: SyncSourceIterable<any>,
): (iterable: $SourceIterable<any>) => $Promise<boolean>;

declare function $includesAny(
  values: SyncSourceIterable<any>,
  iterable: $SourceIterable<any>,
): $Promise<boolean>;

declare function $includesAny<V, T>(
  values: SyncSourceIterable<V>,
  compare: (value: V, item: T) => boolean,
): (iterable: $SourceIterable<T>) => $Promise<boolean>;

declare function $includesAny<V, T>(
  values: SyncSourceIterable<V>,
  compare: (value: V, item: T) => boolean,
  iterable: $SourceIterable<T>,
): $Promise<boolean>;

export default $includesAny;
