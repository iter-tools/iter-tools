/**
 * @generated-from ./$first.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { SourceIterable, Iterable } from '../../types/iterable';
declare function first<Iter extends SourceIterable<any>>(
  iterable: Iter,
): Iter extends [infer First, ...Array<any>]
  ? First
  : Iter extends Iterable<infer T>
  ? T | undefined
  : undefined;
export default first;
