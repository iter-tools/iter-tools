/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$fork.d.ts#1643837503067
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import {
  IterableIterator as SyncIterableIterator,
  Wrappable,
  SingletonIterableIterator,
} from '../../types/iterable';

declare function fork<T>(source: Wrappable<T>): SyncIterableIterator<SingletonIterableIterator<T>>;

export { fork };
