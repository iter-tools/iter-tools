/**
 * @generated-from ./$includes-any-subseq.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { SourceIterable } from '../../types/iterable';
import { SourceIterable as SyncSourceIterable } from '../../types/iterable';
declare function includesAnySubseq(
  subseqs: SyncSourceIterable<SourceIterable<any>>,
): (iterable: SourceIterable<any>) => boolean;
declare function includesAnySubseq(
  subseqs: SyncSourceIterable<SourceIterable<any>>,
  iterable: SourceIterable<any>,
): boolean;
export default includesAnySubseq;
