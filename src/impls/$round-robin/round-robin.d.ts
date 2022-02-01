/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$round-robin.d.ts#1643837503087
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { Wrappable, IterableIterator } from '../../types/iterable';

// prettier-ignore
declare function roundRobin<T>(
  ...sources: Array<Wrappable<T>>
): IterableIterator<T>;

declare function roundRobin<T>(step: number, ...sources: Array<Wrappable<T>>): IterableIterator<T>;

declare function roundRobin<T>(
  start: number,
  step: number,
  ...sources: Array<Wrappable<T>>
): IterableIterator<T>;

declare function roundRobin<T>(
  options: { start?: number; step?: number },
  ...sources: Array<Wrappable<T>>
): IterableIterator<T>;

declare function roundRobin(
  step: number,
): <T>(...sources: Array<Wrappable<T>>) => IterableIterator<T>;

declare function roundRobin(
  start: number,
  step: number,
): <T>(...sources: Array<Wrappable<T>>) => IterableIterator<T>;

declare function roundRobin(options: {
  start?: number;
  step?: number;
}): <T>(...sources: Array<Wrappable<T>>) => IterableIterator<T>;

export { roundRobin };
