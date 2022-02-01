/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$peekerate.d.ts#1643837503083
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { Wrappable, IteratorResult, NonIterableIterator } from '../../types/iterable';

export interface PeekeratorIterator<T> {
  next(): IteratorResult<T>;
  return(): IteratorResult<T>;
  [Symbol.iterator](): NonIterableIterator<T>;
}

interface PeekeratorBase<T> {
  readonly index: number;

  /* eslint-disable no-use-before-define */
  advance(): Peekerator<T>;
  return(): Peekerator<T>;
  /* eslint-enaable no-use-before-define */
  asIterator(): PeekeratorIterator<T>;
}

interface DonePeekerator<T> extends PeekeratorBase<T> {
  readonly current: { done: true; value: undefined };
  readonly done: true;
  readonly value: undefined;
}

interface ValuePeekerator<T> extends PeekeratorBase<T> {
  readonly current: { done: false; value: T };
  readonly done: false;
  readonly value: T;
}

export type Peekerator<T> = DonePeekerator<T> | ValuePeekerator<T>;

declare function peekerate<T>(source: Wrappable<T>): Peekerator<T>;

export { peekerate };
