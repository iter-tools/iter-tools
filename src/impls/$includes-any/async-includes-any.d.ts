/**
 * @generated-from ./$includes-any.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { AsyncWrappable } from '../../types/async-iterable';

declare function asyncIncludesAny(
  same: (a: any, b: any) => boolean,
  values: Array<any>,
): (iterable: AsyncWrappable<any>) => Promise<boolean>;

declare function asyncIncludesAny(
  same: (a: any, b: any) => boolean,
  values: Array<any>,
  iterable: AsyncWrappable<any>,
): Promise<boolean>;

declare function asyncIncludesAny(
  values: Array<any>,
  iterable: AsyncWrappable<any>,
): Promise<boolean>;

export { asyncIncludesAny };
