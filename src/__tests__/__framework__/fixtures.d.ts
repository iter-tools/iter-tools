import { ResultIterable } from '../../internal/iterable';
import { AsyncResultIterable } from '../../internal/async-iterable';

export declare class OneTwoThreeIterable {
  next(): IteratorResult<number>;
  return(): void;

  [Symbol.iterator](): ResultIterable<number>;
}

export declare class AsyncOneTwoThreeIterable {
  next(): Promise<IteratorResult<number>>;
  return(): Promise<void>;

  [Symbol.asyncIterator](): AsyncResultIterable<number>;
}
