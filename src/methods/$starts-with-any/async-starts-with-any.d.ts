/**
 * @generated-from ./$starts-with-any.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { AsyncInputIterable, AsyncPromise, AsyncMaybePromise } from '../../internal/async-iterable';
import { InputIterable as SyncInputIterable } from '../../internal/iterable';
declare function asyncStartsWithAny(
  values: SyncInputIterable<any>,
): (iterable: AsyncInputIterable<any>) => AsyncPromise<boolean>;
declare function asyncStartsWithAny(
  values: SyncInputIterable<any>,
  iterable: AsyncInputIterable<any>,
): AsyncPromise<boolean>;
export default asyncStartsWithAny;
