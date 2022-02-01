/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$round-robin.d.ts#1643837503087
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { AsyncWrappable, AsyncIterableIterator } from '../../types/async-iterable';

// prettier-ignore
declare function asyncRoundRobin<T>(
  ...sources: Array<AsyncWrappable<T>>
): AsyncIterableIterator<T>;

declare function asyncRoundRobin<T>(
  step: number,
  ...sources: Array<AsyncWrappable<T>>
): AsyncIterableIterator<T>;

declare function asyncRoundRobin<T>(
  start: number,
  step: number,
  ...sources: Array<AsyncWrappable<T>>
): AsyncIterableIterator<T>;

declare function asyncRoundRobin<T>(
  options: { start?: number; step?: number },
  ...sources: Array<AsyncWrappable<T>>
): AsyncIterableIterator<T>;

declare function asyncRoundRobin(
  step: number,
): <T>(...sources: Array<AsyncWrappable<T>>) => AsyncIterableIterator<T>;

declare function asyncRoundRobin(
  start: number,
  step: number,
): <T>(...sources: Array<AsyncWrappable<T>>) => AsyncIterableIterator<T>;

declare function asyncRoundRobin(options: {
  start?: number;
  step?: number;
}): <T>(...sources: Array<AsyncWrappable<T>>) => AsyncIterableIterator<T>;

export { asyncRoundRobin };
