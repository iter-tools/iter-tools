import { $Promise } from '../../../generate/async.macro';

import { $InputIterable } from '../../internal/$iterable';
import { InputIterable as SyncInputIterable } from '../../internal/iterable';

declare function $includesAny(
  values: SyncInputIterable<any>,
): (iterable: $InputIterable<any>) => $Promise<boolean>;

declare function $includesAny(
  values: SyncInputIterable<any>,
  iterable: $InputIterable<any>,
): $Promise<boolean>;

export default $includesAny;
