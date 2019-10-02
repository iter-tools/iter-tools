/**
 * @generated-from ./$trailing-window.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { Repeat8 } from '../../internal/types/utility';
import { AsyncSourceIterable, AsyncResultIterable } from '../../types/async-iterable';
declare function asyncTrailingWindow<Size extends number, Filler = undefined, T = any>(
  opts: {
    readonly size: Size;
    readonly filler?: Filler;
  },
  iterable: AsyncSourceIterable<T>,
): AsyncResultIterable<Repeat8<T | Filler, Size>>;
export default asyncTrailingWindow;
