/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$starts-with-any.d.ts#1643837503101
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { Wrappable } from '../../types/iterable';

declare function startsWithAny(
  same: (a: any, b: any) => boolean,
  values: Array<any>,
): (iterable: Wrappable<any>) => boolean;

declare function startsWithAny(
  same: (a: any, b: any) => boolean,
  values: Array<any>,
  iterable: Wrappable<any>,
): boolean;

declare function startsWithAny(values: Array<any>, iterable: Wrappable<any>): boolean;

export { startsWithAny };
