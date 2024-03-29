/**
 * @generated-from ./$equal.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { Wrappable } from '../../types/iterable';

declare function equal(
  same: (a: any, b: any) => boolean,
): (...seqs: Array<Wrappable<any>>) => boolean;

declare function equal<T>(same: (a: T, b: T) => boolean, ...seqs: Array<Wrappable<T>>): boolean;

declare function equal(...seqs: Array<Wrappable<any>>): boolean;

export { equal };
