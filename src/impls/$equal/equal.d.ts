/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$equal.d.ts#1643837503057
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { Wrappable } from '../../types/iterable';

declare function equal(
  same: (a: any, b: any) => boolean,
): (...seqs: Array<Wrappable<any>>) => (iterable: Wrappable<any>) => boolean;

declare function equal(
  same: (a: any, b: any) => boolean,
  ...seqs: Array<Wrappable<any>>
): (iterable: Wrappable<any>) => boolean;

declare function equal(...seqs: Array<Wrappable<any>>): (iterable: Wrappable<any>) => boolean;

export { equal };
