/**
 * @generated-from ./$first-or.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { SourceIterable } from '../../types/iterable';

declare function firstOr<E, T>(whenEmpty: E, iterable: SourceIterable<T>): T | E;

export { firstOr };
