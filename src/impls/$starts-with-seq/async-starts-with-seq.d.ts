/**
 * @generated-from ./$starts-with-seq.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { AsyncWrappable } from '../../types/async-iterable';

declare function asyncStartsWithSeq(
  valueSeq: AsyncWrappable<any>,
): (iterable: AsyncWrappable<any>) => Promise<boolean>;

declare function asyncStartsWithSeq(
  valueSeq: AsyncWrappable<any>,
  iterable: AsyncWrappable<any>,
): Promise<boolean>;

export { asyncStartsWithSeq };
