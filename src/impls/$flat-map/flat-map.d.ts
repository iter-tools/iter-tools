/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$flat-map.d.ts#1643837503064
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { Wrappable, IterableIterator } from '../../types/iterable';

declare function flatMap<O, T>(
  func: (value: T, i: number) => Wrappable<O>,
): (source: Wrappable<T>) => IterableIterator<O>;

declare function flatMap<O, T>(
  func: (value: T, i: number) => Wrappable<O>,
  source: Wrappable<T>,
): IterableIterator<O>;

export { flatMap };
