/**
 * @generated-from ./$last.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { InputIterable, Promise } from '../../internal/iterable';
declare function last<T = any>(iterable: InputIterable<T>): Promise<T | undefined>;
export default last;
