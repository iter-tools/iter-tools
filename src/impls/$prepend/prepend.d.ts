/**
 * @generated-from ./$prepend.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { Wrappable, IterableIterator } from '../../types/iterable';

declare function prepend<T, V>(value: V, source: Wrappable<T>): IterableIterator<V | T>;

declare function prepend<V>(value: V): <T>(source: Wrappable<T>) => IterableIterator<V | T>;

export { prepend };
