/**
 * @generated-from ./$fork.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import {
  IterableIterator as SyncIterableIterator,
  Wrappable,
  IterableIterator,
} from '../../types/iterable';

declare function fork<T>(source: Wrappable<T>): SyncIterableIterator<IterableIterator<T>>;

export { fork };