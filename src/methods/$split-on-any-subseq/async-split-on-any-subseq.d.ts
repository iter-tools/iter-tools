/**
 * @generated-from ./$split-on-any-subseq.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { SourceIterable as SyncSourceIterable } from '../../types/iterable';
import { AsyncSourceIterable, AsyncResultIterable } from '../../types/async-iterable';
declare function asyncSplit(
  subseqs: SyncSourceIterable<AsyncSourceIterable<any>>,
): <T = any>(iterable: AsyncSourceIterable<T>) => AsyncResultIterable<AsyncResultIterable<T>>;
declare function asyncSplit<T = any>(
  subseqs: SyncSourceIterable<AsyncSourceIterable<any>>,
  iterable: AsyncSourceIterable<T>,
): AsyncResultIterable<AsyncResultIterable<T>>;
export default asyncSplit;
