/**
 * @generated-from ./$split-at.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { ResultIterable as SyncResultIterable } from '../../types/iterable';
import { SourceIterable, ResultIterable } from '../../types/iterable';
declare function splitAt(
  idx: number,
): <T>(source: SourceIterable<T>) => SyncResultIterable<ResultIterable<T>>;
declare function splitAt<T>(
  idx: number,
  source: SourceIterable<T>,
): SyncResultIterable<ResultIterable<T>>;
export default splitAt;
