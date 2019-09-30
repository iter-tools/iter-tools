import { $Promise, $MaybePromise } from '../../../generate/async.macro';

import { $InputIterable } from '../../internal/$iterable';
import { InputIterable as SyncInputIterable } from '../../internal/iterable';

declare function $startsWithAny(
  values: SyncInputIterable<any>,
): (iterable: $InputIterable<any>) => $Promise<boolean>;

declare function $startsWithAny(
  values: SyncInputIterable<any>,
  iterable: $InputIterable<any>,
): $Promise<boolean>;

export default $startsWithAny;
