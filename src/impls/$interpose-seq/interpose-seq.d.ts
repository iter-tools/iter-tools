/**
 * @generated-from ./$interpose-seq.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { SourceIterable, ResultIterable } from '../../types/iterable';

declare function interposeSeq<V>(
  seq: SourceIterable<V>,
): <T>(source: SourceIterable<T>) => ResultIterable<T | V>;

declare function interposeSeq<V, T>(
  seq: SourceIterable<V>,
  source: SourceIterable<T>,
): ResultIterable<T | V>;

export { interposeSeq };
