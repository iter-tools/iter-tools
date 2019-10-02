import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../internal/$iterable';
import { SourceIterable as SyncSourceIterable } from '../../internal/iterable';

declare function $includesAny(
  values: SyncSourceIterable<any>,
): (iterable: $SourceIterable<any>) => $Promise<boolean>;

declare function $includesAny(
  values: SyncSourceIterable<any>,
  iterable: $SourceIterable<any>,
): $Promise<boolean>;

export default $includesAny;
