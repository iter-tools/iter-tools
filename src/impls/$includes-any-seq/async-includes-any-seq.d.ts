/**
 * @generated-from ./$includes-any-seq.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { AsyncWrappable } from '../../types/async-iterable';

declare function asyncIncludesAnySeq(
  same: (a: any, b: any) => boolean,
  value: Array<AsyncWrappable<any>>,
): (iterable: AsyncWrappable<any>) => Promise<boolean>;

declare function asyncIncludesAnySeq(
  same: (a: any, b: any) => boolean,
  value: Array<AsyncWrappable<any>>,
  iterable: AsyncWrappable<any>,
): Promise<boolean>;

declare function asyncIncludesAnySeq(
  value: Array<AsyncWrappable<any>>,
  iterable: AsyncWrappable<any>,
): Promise<boolean>;

export { asyncIncludesAnySeq };
